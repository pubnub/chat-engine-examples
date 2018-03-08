export default (request, response) => {

    const pubnub = require('pubnub');
    const kvstore = require('kvstore');
    const xhr = require('xhr');

    let headers = request.headers;
    let method = request.method;

    let body = request.body && JSON.parse(request.body);
    let route = request.params.route;

    response.status = 200;
    return response.send();

    // return request.json().then((body) => {
    //     response.status = 200;
    //     return response.send(body);
    // }).catch((err) => {
    //     // console.log(err)
    //     return response.send("Malformed JSON body.");
    // });

    // let validateCredentials = (uuid, authKey, authData) => {

    //     return new Promise((resolve, reject) => {

    //         return xhr.fetch('https://graph.facebook.com/debug_token?access_token=305450936585628|d86681ec056638c4e80ee0921ea3bc34&input_token=' + authKey)
    //         .then((x) => x.json()).then((x) => {

    //             if(x.data.is_valid && x.data.user_id == uuid) {
    //                 resolve({uuid, authKey});
    //             } else {
    //                 reject();
    //             }

    //         });

    //     });

    // };

    // if (route === 'invite') {

    //     return authPromise;

    //     // can this user invite?
    //     // return allow();

    // } else if (route === 'grant') {

    //     // is this user allowed in the channel they're trying to join?
    //     // return allow();

    //     return authPromise;

    // } else if (route === 'bootstrap') {

    //     console.log('route is bootstrap', 'calling')

    //     return authPromise.then((data) => {
    //         console.log('setting',['valid', data.uuid].join(':'), 'as', data.authKey)
    //         return db.set(['valid', data.uuid].join(':'), data.authKey).then((worked) => {
    //             console.log('it worked')
    //         }).catch((err)=> {
    //             console.log(err)
    //         });
    //     }).catch((err) => {
    //         console.log('there was a problem', err);
    //     });

    // } else {

    //     // all other requests
    //     // return allow();
    //     return authPromise;

    // }

};
