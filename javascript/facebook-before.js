export default (request, response) => {

    console.log('run 1')

    const db = require('kvstore');

    let headersObject = request.headers;

    console.log('here 5')

    console.log(request);

    // let key = ['valid', uuid].join(':');

    // console.log(key)

    // return db.get(key).then((dbKey) => {

    //     console.log('db get response')

    //     if(authKey === dbKey) {
    //         return request.ok();
    //     }  else {
    //         return request.abort();
    //     }

    // }).catch((err) => {
    //     return request.abort();
    // });

};
