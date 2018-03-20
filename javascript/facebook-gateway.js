export default (request, response) => {

    const xhr = require('xhr');

    const myFBToken = '305450936585628';
    const myFBSecret = 'd86681ec056638c4e80ee0921ea3bc34';

    const done = (json) => {

        response.status = 200;

        let body = JSON.stringify(json);
        return response.send(body);

    };

    const allow = () => { return done({allow: true}) };
    const deny = (text) => { return done({allow: false, text}) };
    const die = (text) => { return done(false, 'There was a problem with the gateway.') };

    request = request.body && JSON.parse(request.body);

    let validateFBToken = (uuid, authKey, authData) => {

        return new Promise((resolve, reject) => {

            return xhr.fetch(`https://graph.facebook.com/debug_token?access_token=${myFBToken}|${myFBSecret}&input_token=${authKey}`)
            .then((x) => x.json()).then((x) => {

                if(x.data.is_valid && x.data.user_id == uuid) {

                    console.log('fb was able to validate');

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

    let isOverAge = (uuid, authKey, minAge = 13) => {

        return new Promise((resolve, reject) => {

            let url = `https://graph.facebook.com/${uuid}?&access_token=${authKey}&fields=age_range`;

            return xhr.fetch(url)
            .catch(() =>{

                return resolve({
                    allow: false,
                    text: 'Facebook says this is an invalid token'
                });

            })
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

    const route = request.params.route;

    if (route == 'login') {

        console.log('trying to validate fb token')

        return validateFBToken(request.body.uuid, request.body.authKey, request.body.authData)
            .then(done).catch(die);

    } else if (route == 'grant') {

        return isOverAge(request.body.uuid, request.body.authKey, 13)
            .then(done)
            .catch(die);

    } else {

        return done({
            allow: true
        });

    }

};
