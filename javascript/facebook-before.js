export default (request, response) => {

    const db = require('kvstore');

    console.log('request made');

    if(request.channels[0].indexOf('ce#') === 0) {

        const url = `https://pubsub.pubnub.com/v1/blocks/sub-key/${request.subkey}/chat-engine-server?route=validate&uuid=${request.message.params.uuid}&authKey=${request.message.params.auth}`;

        return xhr.fetch(url, httpOptions).then((res) => {

            console.log(res);

            if (res.status === 200) {
                return resolve(res);
            } else {
                return reject(res);
            }

        }).catch((err) => {
            return reject(err);
        });

    }

    return request.ok();

};
