const now = new Date().getTime();
const username = ['user', now].join('-');
const textInput = document.getElementById('chat-input');
const textOutput = document.getElementById('chat-output');

let sendChat = function() {}; // will be filled in when ChatEngine connects

const ChatEngine = ChatEngineCore.create({
    publishKey: 'pub-c-01491c54-379f-4d4a-b20b-9a03c24447c7',
    subscribeKey: 'sub-c-eaf4a984-4356-11e8-91e7-8ad1b2d46395'
}, {
    namespace: 'test',
    debug: true
});

ChatEngine.connect(username, 'auth-key' + new Date().getTime());

ChatEngine.on('$.ready', (data) => {

    sendChat = function(e) {

        console.log('emitting')

        ChatEngine.global.emit('message', {
            text: textInput.value
        });

        textInput.value = '';

        return false;

    };

    checkSubmit = function(e) {

        if (e.keyCode == 13) {
            sendChat();
        }
    }

    ChatEngine.global.on('message', (payload) => {

        let div = document.createElement("p");
        div.innerHTML = payload.sender.uuid + ': ' + payload.data.text;
        textOutput.appendChild(div);

    });
});
