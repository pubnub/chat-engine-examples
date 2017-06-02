
const assert = require('chai').assert;
const emoji = require('./src/plugin.js');

const OpenChatFramework = require('ocf');

let pluginchat;
let OCF;

describe('config', function() {

    it('should be configured', function() {

        OCF = OpenChatFramework.create('test-channel', {
            publishKey: 'demo',
            subscribeKey: 'demo',
            uuid: new Date(),
            state: {}
        });

        assert.isOk(OCF);

    });

});

describe('connect', function() {

    it('should be identified as new user', function() {

        me = OCF.connect('robot-tester', {works: true});
        assert.isObject(me);

    });

});

describe('plugins', function() {

    it('should be created', function() {

        pluginchat = new OCF.Chat('pluginchat' + new Date().getTime());

        pluginchat.plugin(emoji());

    });

    it('publish and subscribe hooks should be called', function(done) {

        pluginchat.on('$ocf.ready', () => {

            let success = '<img class="emoji" title=":pizza:" alt="pizza" src="http://www.webpagefx.com/tools/emoji-cheat-sheet/graphics/emojis/pizza.png" height="16" />';

            pluginchat.on('message', (payload) => {

                console.log('message')

                assert.isAbove(payload.data.text.indexOf(success), 0, 'emoji rendered');
                done();

            });

            pluginchat.emit('message', {
                text: 'I want :pizza:'
            });

        });

    });

});
