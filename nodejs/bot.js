"use strict";

let ChatEngineCore = require('chat-engine');
let typingIndicator = require('chat-engine-typing-indicator');

var ChatEngine = ChatEngineCore.create({
    publishKey: 'pub-c-07824b7a-6637-4e6d-91b4-7f0505d3de3f',
    subscribeKey: 'sub-c-43b48ad6-d453-11e6-bd29-0619f8945a4f'
}, 'chat-engine-jquery-kitchen-sink');

ChatEngine.onAny((payload) => {
    console.log('any', payload)
})

var me = ChatEngine.connect('robot-stephen', {username: 'robot-stephen'});

var chats = {};

me.direct.on('private-invite', (payload) => {

    var chat = chats[payload.data.channel];

    if(!chat) {

        chats[payload.data.channel] = new ChatEngine.Chat(payload.data.channel);

        chat = chats[payload.data.channel];

        chat.plugin(typingIndicator({
            timeout: 5000
        }));

        chat.emit('message', 'hey, how can I help you?');

        chat.on('message', (payload) => {

            if(payload.sender.uuid !== me.uuid) { // add to github issues

                setTimeout((argument) => {

                    chat.typingIndicator.startTyping();

                    setTimeout((argument) => {

                        console.log(payload.sender.state() )
                        console.log(chat.users)

                        chat.emit('message', 'hey there ' + payload.sender.state().username);

                        chat.typingIndicator.stopTyping(); // add this to plugin middleware

                    }, 1000);

                }, 500);

            }

        });

    }

});
