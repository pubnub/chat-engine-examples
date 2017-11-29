const queryStringCodec = require('codec/query_string');
const xhr = require('xhr');

export default (request, response) => {

    response.headers['Access-Control-Allow-Origin'] = '*';
    response.headers['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept';
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS, PUT, DELETE';

    let proxyRequest = JSON.parse(request.body);

    // body from oritinal auth request
    let body = proxyRequest.body && JSON.parse(proxyRequest.body) || {};

    // query params from original auth request
    let params = proxyRequest.params || {};

    let allow = () => {
        console.log(params.route, 'allow');
        response.status = 200;
        return response.send();
    };

    let unauthorized = () => {
        console.log(params.route, 'unauthed')
        response.status = 401;
        return response.send();
    };

    let die = (error) => {
        console.log(params.route, 'dead')
        response.status = 500;
        return response.send(error);
    };

    const query = queryStringCodec.stringify({
        input_token: body.authKey || params.authKey,
        access_token: '305450936585628|d86681ec056638c4e80ee0921ea3bc34'
    });

    let requestUrl = `https://graph.facebook.com/debug_token?${query}`;

    return xhr.fetch(requestUrl).then((response) => {

        let responseBody = JSON.parse(response.body);

        console.log(responseBody)

        if(responseBody.data.is_valid && responseBody.data.user_id == (body.uuid || params.uuid)) {
            return allow();
        } else {
            return unauthorized()
        }

    }).catch((err) => {

        console.log(err)

        console.log('die')
        return die(err);
    });

};
