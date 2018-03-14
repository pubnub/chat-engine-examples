# JS SDK connects to servers with a Facebook uuid and authToken

```js
function buildChatEngine(fbMe, fbAccessToken) {
    ChatEngine.connect(fbMe.id, fbMe, fbAccessToken);
};
```

# Server Functions receives request but does not execute

ChatEngine Server Function receives the request and immediately proxies it to
the Gateway Function. It will not continue unless it receives ```{ allow: true }```
from the Gateway.

```js
return authPolicy().then((res) => {

    console.log(res)

    let b = {allow: false};

    try {
        b = JSON.parse(res.body);
    } catch(err) {
        response.status = 500;
        return response.send('could not parse auth json');
    }

    if(b.allow) {
        return controllers[route][method]();
    } else {
        response.status = 401;
        return response.send(res.body);
    }

}).catch((res) => {
    response.status = 200;
    return response.send();
});
```

# The Gateway Function Checks the Auth Policy

The Gateway Function returns "allow" ```true``` or ```false``` depending on
the policy. Authentication policies are usually defined on a per route basis
in code. In general, a policy is in charge of "who" can do "what."

In this example, notice how login needs to ```validateFBToken```. See below for what that does.

```js
export default (request, response) => {

    if (route == 'login') {
        return validateFBToken(request.body.uuid, request.body.authKey, request.body.authData)
            .then(done).catch(die);
    } else if (route == 'grant') {
        return isOverAge(request.body.uuid, request.body.authKey, 13)
            .then(done).catch(die);

    } else {

        return done({
            allow: true
        });

    }

};
```

This Gateway Functions has access to all the same parameters as the
Server Function.

```js
request = request.body && JSON.parse(request.body);
```

## Validate FB Token on Login

This is an example function you might find in the auth policy. It validates
the supplied uuid and authToken to grant the user access to ChatEngine.

```js
let validateFBToken = (uuid, authKey, authData) => {

    return new Promise((resolve, reject) => {

        return xhr.fetch(`https://graph.facebook.com/debug_token?access_token=${myFBToken}|${myFBSecret}&input_token=${authKey}`)
        .then((x) => x.json()).then((x) => {

            if(x.data.is_valid && x.data.user_id == uuid) {
                resolve({
                    allow: true
                });
            } else {
                resolve({
                    allow: false,
                    text: 'Could not validate auth token.'
                });
            }

        });

    });

};
```

This will return JSON to the server.

# The Server executes the actual logic on good response

If the token is valid, the Server Function stores the ```authKey``` in the db keyed by ```uuid```.

```js
controllers.login.post = () => {

    return db.set(['valid', body.uuid].join(':'), body.authKey).then((worked) => {

        response.status = 200;
        return response.send('it worked');

    }).catch((err) => {

        response.status = 401;
        return response.send('it did not work');

    });

}
```

# Every PubNub and Server (TBD) request thereafter is validated

By comparing the uuid and the cached authToken, we can validate that the user
is who they say they are. This is because Facebook told us so, and we cached
that in the db.

```js
export default (request, response) => {

    const db = require('kvstore');

    if(request.channels[0].indexOf('chat-engine#') === 0) {

        console.log('need to be authed to do that');

        console.log(request)

        let key = ['valid', request.message.sender].join(':');

        return db.get(key).then((dbKey) => {

            console.log('db get response', key, request.params.auth, dbKey, request.params.auth == dbKey)

            if(request.params.auth === dbKey) {

                console.log('you are currently authed!');

                return request.ok();
            }  else {
                return request.abort();
            }

        }).catch((err) => {
            return request.abort();
        });

    } else {
        console.log('this is not require auth')
        return request.ok();
    }

};
```

# Bonus policy

Here is a policy that restricts people from getting grants unless Facebook
tells us they're over the age of 13.

```js
let isOverAge = (uuid, authKey, minAge = 13) => {

    return new Promise((resolve, reject) => {

        let url = `https://graph.facebook.com/${uuid}?&access_token=${authKey}&fields=age_range`;

        return xhr.fetch(url)
        .then((x) => x.json()).then((x) => {

            if(x.age_range.min > minAge) {
                return resolve({
                    allow: true,
                });
            } else {
                return resolve({
                    allow: false,
                    text: 'Not old enough'
                });
            }

        });

    });

};
```
