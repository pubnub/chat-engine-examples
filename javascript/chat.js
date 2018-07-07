const now = new Date().getTime();
const username = ['user', now].join('-');
const textInput = document.getElementById('chat-input');
const textOutput = document.getElementById('chat-output');

let sendChat = function() {}; // will be filled in when ChatEngine connects

const ChatEngine = ChatEngineCore.create({
    publishKey: 'pub-c-5ac6daf0-68af-42e4-a10e-272dde9e102e',
    subscribeKey: 'sub-c-d850793e-8082-11e8-9629-8e5476d20059'
}, {
    namespace: 'test',
    debug: false
});

ChatEngine.connect(username, 'auth-key' + new Date().getTime());

ChatEngine.on('$.ready', (data) => {

    sendChat = function(e) {

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
