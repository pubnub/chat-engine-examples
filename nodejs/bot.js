"use strict";

let ChatEngineCore = require('../../chat-engine/src/index.js');
let typingIndicator = require('chat-engine-typing-indicator');

var ChatEngine = ChatEngineCore.create({
    publishKey: 'pub-c-bcf4e625-d5e0-45de-9f74-f222bf63a4a1',
    subscribeKey: 'sub-c-70f29a7c-8927-11e7-af73-96e8309537a2',
}, {
    globalChannel: 'chat-engine-jquery-kitchen-sink',
    insecure: true
});

ChatEngine.onAny((payload) => {
    console.log('any', payload)
})

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

            chat.emit('message', 'hey, how can I help you?');

            chat.on('message', (payload) => {

                if (payload.sender.uuid !== me.uuid) { // add to github issues

                    setTimeout((argument) => {

                        chat.typingIndicator.startTyping();

                        setTimeout((argument) => {

                            console.log(payload.sender.state())
                            console.log(chat.users)

                            chat.emit('message', 'hey there ' + payload.sender.state().username);

                            chat.typingIndicator.stopTyping(); // add this to plugin middleware

                        }, 1000);

                    }, 500);

                }

            });

        }

    });

});
