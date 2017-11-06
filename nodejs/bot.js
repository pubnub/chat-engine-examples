"use strict";

let ChatEngineCore = require('../../chat-engine');
let typingIndicator = require('chat-engine-typing-indicator');

var ChatEngine = ChatEngineCore.create({
    publishKey: 'pub-c-311175ef-cdc1-4da9-9b70-f3e129bb220e',
    subscribeKey: 'sub-c-a3da7f1c-bfe7-11e7-a9bc-9af884579700',
}, {
    endpoint: 'https://pubsub.pubnub.com/v1/blocks/sub-key/sub-c-a3da7f1c-bfe7-11e7-a9bc-9af884579700/insecure',
    globalChannel: 'chat-engine-jquery-kitchen-sink'
});

ChatEngine.connect('robot-stephen', { username: 'robot-stephen' }, 'auth-key');

var chats = {};

ChatEngine.onAny((a) => {
    console.log(a)
})

ChatEngine.on('$.ready', (data) => {

    let me = data.me;

    me.direct.on('$.invite', (payload) => {

        var chat = chats[payload.data.channel];

        if (!chat) {

            chats[payload.data.channel] = new ChatEngine.Chat(payload.data.channel);

            chat = chats[payload.data.channel];

            chat.plugin(typingIndicator({
                timeout: 5000
            }));

            chat.emit('message', 'hey, how can I help you?');

            chat.on('message', (payload) => {

                if (payload.sender.uuid !== me.uuid) { // add to github issues

                    setTimeout((argument) => {

                        chat.typingIndicator.startTyping();

                        setTimeout((argument) => {

                            chat.emit('message', 'hey there ' + payload.sender.state.username);

                            chat.typingIndicator.stopTyping(); // add this to plugin middleware

                        }, 1000);

                    }, 500);

                }

            });

        }

    });

});
