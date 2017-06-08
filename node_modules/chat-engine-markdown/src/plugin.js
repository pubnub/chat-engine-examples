const snarkdown = require('snarkdown');
const dotty = require("dotty");

module.exports = (config = {}) => {

    config.prop = config.prop || 'data.text';

    let parseMarkdown = function(payload, next) {

        let text = dotty.get(payload, config.prop);

        if(text) {
            dotty.put(payload, config.prop, snarkdown(text));
        }

        // continue along middleware
        next(null, payload);

    };

    // define both the extended methods and the middleware in our plugin
    return {
        namespace: 'markdown',
        middleware: {
            on: {
                'message': parseMarkdown,
                '$history.message': parseMarkdown
            }
        },
    }

}
