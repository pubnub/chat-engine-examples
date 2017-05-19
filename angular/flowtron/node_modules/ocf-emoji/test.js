
const assert = require('chai').assert;
const emoji = require('./src/plugin.js');

const OpenChatFramework = require('ocf');

let pluginchat;
let OCF;

describe('config', function() {

    it('should be configured', function() {

        OCF = OpenChatFramework.create({
            globalChannel: 'test-channel',
            rltm: {
                service: 'pubnub',
                    config: {
                    publishKey: 'pub-c-07824b7a-6637-4e6d-91b4-7f0505d3de3f',
                    subscribeKey: 'sub-c-43b48ad6-d453-11e6-bd29-0619f8945a4f',
                    uuid: new Date(),
                    state: {}
                }
            }
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

        pluginchat.plugin(emoji({}));

    });

    it('publish and subscribe hooks should be called', function(done) {

        pluginchat.ready(() => {

            let success = '<img class="emoji" title=":pizza:" alt="pizza" src="http://www.webpagefx.com/tools/emoji-cheat-sheet/graphics/emojis/pizza.png" height="16" />';

            pluginchat.on('message', (payload) => {

                assert.isAbove(payload.data.text.indexOf(success), 0, 'emoji rendered');
                done();

            });

            pluginchat.send('message', {
                text: 'I want :pizza:'
            });

        });

    });

});
