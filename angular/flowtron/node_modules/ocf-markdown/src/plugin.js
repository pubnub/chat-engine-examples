const snarkdown = require('snarkdown');

module.exports = (config) => {

    let parseMarkdown = function(payload, next) {

        if(payload.data.text) {
            payload.data.text = snarkdown(payload.data.text);
        }

        // continue along middleware
        next(null, payload);

    };

    // define middleware to run after a message has been received and OCF has processed it
    let broadcast = {
        'message': parseMarkdown,
        '$history.message': parseMarkdown
    };

    // define both the extended methods and the middleware in our plugin
    return {
        namespace: 'markdown',
        middleware: {
            broadcast: broadcast
        },
    }

}
