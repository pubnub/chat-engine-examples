"use strict";

// load the jquery/kitchen-sink example to see the bot in action
let ChatEngineCore = require('../../chat-engine');
let typingIndicator = require('chat-engine-typing-indicator');

var ChatEngine = ChatEngineCore.create({
    publishKey: 'pub-c-01491c54-379f-4d4a-b20b-9a03c24447c7',
    subscribeKey: 'sub-c-eaf4a984-4356-11e8-91e7-8ad1b2d46395'
}, {
    namespace: 'jq-ks',
    debug: false
});

ChatEngine.connect('robot', 'some-auth-key');

var chats = {};

ChatEngine.onAny((a) => {
    console.log(a)
})

ChatEngine.on('$.ready', (me) => {

    me.update({ username: 'rob-the-robot' });

    me.direct.on('$.invite', (payload) => {

        var chat = chats[payload.data.channel];

        if (!chat) {

            chats[payload.data.channel] = new ChatEngine.Chat(payload.data.channel);

            chat = chats[payload.data.channel];

            chat.plugin(typingIndicator({
                timeout: 5000
            }));

            chat.emit('message', {
                text: 'hey, how can I help you?'
            });

            chat.on('message', (payload) => {

                if (payload.sender.uuid !== me.uuid) { // add to github issues

                    setTimeout((argument) => {

                        chat.typingIndicator.startTyping();

                        setTimeout((argument) => {

                            chat.emit('message', {
                                text: 'hey there ' + payload.sender.state().username
                            });

                            chat.typingIndicator.stopTyping(); // add this to plugin middleware

                        }, 1000);

                    }, 500);

                }

            });

        }

    });

});
