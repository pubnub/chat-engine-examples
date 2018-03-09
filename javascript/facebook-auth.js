export default (request, response) => {

    const xhr = require('xhr');

    const myFBToken = '305450936585628';
    const myFBSecret = 'd86681ec056638c4e80ee0921ea3bc34';

    const done = (pass = false, text = null) => {
        response.status = 200;
        return response.send({
            allow: pass,
            text: text
        });
    };

    const allow = () => done(true);
    const deny = (text) => done(false, 'not allowed');
    const die = (text) => done(false, 'error');

    request = request.body && JSON.parse(request.body);

    let validateFBToken = (uuid, authKey, authData) => {

        return new Promise((resolve, reject) => {

            return xhr.fetch(`https://graph.facebook.com/debug_token?access_token=${myFBToken}|${myFBSecret}&input_token=${authKey}`)
            .then((x) => x.json()).then((x) => {

                console.log('fb response', x);

                if(x.data.is_valid && x.data.user_id == uuid) {
                    resolve({uuid, authKey});
                } else {
                    reject();
                }

            });

        });

    };

    const route = request.params.route;

    if (route == 'login') {

        return validateFBToken(request.body.uuid, request.body.authKey, request.body.authData)
            .then(allow).catch(deny);

    } else if (route == 'grant') {
        return deny();
    } else {
        return allow();
    }

};
