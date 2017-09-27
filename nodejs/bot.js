"use strict";

let ChatEngineCore = require('chat-engine');
let typingIndicator = require('chat-engine-typing-indicator');

var ChatEngine = ChatEngineCore.create({
    publishKey: 'pub-c-c6303bb2-8bf8-4417-aac7-e83b52237ea6',
    subscribeKey: 'sub-c-67db0e7a-50be-11e7-bf50-02ee2ddab7fe'
}, {
    endpoint: 'http://localhost:3000/insecure',
    globalChannel: 'chat-engine-jquery-kitchen-sink'
});

ChatEngine.onAny((payload) => {
    console.log('any', payload)
})

console.log(typingIndicator)

ChatEngine.connect('robot-stephen', { username: 'robot-stephen' }, 'auth-key');

var chats = {};

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

            console.log(chat.typingIndicator)

            chat.emit('message', 'hey, how can I help you?');

            chat.on('message', (payload) => {

                if (payload.sender.uuid !== me.uuid) { // add to github issues

                    setTimeout((argument) => {

                        chat.typingIndicator.startTyping();

                        setTimeout((argument) => {

                            console.log(payload.sender.state)
                            console.log(chat.users)

                            chat.emit('message', 'hey there ' + payload.sender.state.username);

                            chat.typingIndicator.stopTyping(); // add this to plugin middleware

                        }, 1000);

                    }, 500);

                }

            });

        }

    });

});
