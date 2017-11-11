"use strict";

// load the jquery/kitchen-sink example to see the bot in action

let ChatEngineCore = require('chat-engine');
let typingIndicator = require('chat-engine-typing-indicator');

var ChatEngine = ChatEngineCore.create({
    publishKey: 'pub-c-d8599c43-cecf-42ba-a72f-aa3b24653c2b',
    subscribeKey: 'sub-c-6c6c021c-c4e2-11e7-9628-f616d8b03518'
}, {
    globalChannel: 'chat-engine-jquery-kitchen-sink',
    debug: false
});

ChatEngine.connect('robot', { username: 'rob-the-robot' });

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

            chat.emit('message', {
                text: 'hey, how can I help you?'
            });

            chat.on('message', (payload) => {

                if (payload.sender.uuid !== me.uuid) { // add to github issues

                    setTimeout((argument) => {

                        chat.typingIndicator.startTyping();

                        setTimeout((argument) => {

                            chat.emit('message', {
                                text: 'hey there ' + payload.sender.state.username
                            });

                            chat.typingIndicator.stopTyping(); // add this to plugin middleware

                        }, 1000);

                    }, 500);

                }

            });

        }

    });

});
