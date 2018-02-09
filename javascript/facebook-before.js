export default (request, response) => {

    console.log('run')

    const db = require('kvstore');

    let headersObject = request.headers;

    let method = request.method;
    let params = request.params;
    let body = request.body;

    let authKey = (method == 'get') ? params.authKey : body.authKey;
    let uuid = (method == 'get') ? params.uuid : body.uuid;

    console.log('run before publish')

    // console.log('run', authKey, uuid);
    // return request.ok();

    return db.get(['valid', uuid]).then((dbKey) => {

        if(authKey === dbKey) {
            response.status = 200;
        }  else {
            response.status = 401;
        }

        return response.send();

    });

};
