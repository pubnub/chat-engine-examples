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
