const now = new Date().getTime();
const username = ['user', now].join('-');
const textInput = document.getElementById('chat-input');
const textOutput = document.getElementById('chat-output');

let sendChat = function() {}; // will be filled in when ChatEngine connects

const ChatEngine = ChatEngineCore.create({
    publishKey: 'pub-c-d8599c43-cecf-42ba-a72f-aa3b24653c2b',
    subscribeKey: 'sub-c-6c6c021c-c4e2-11e7-9628-f616d8b03518'
}, {
    globalChannel: 'chat-engine-demo-js',
    debug: true
});

ChatEngine.onAny((a) => {
    // console.log(a)
});

ChatEngine.connect(username, {
    signedOnTime: now
}, 'auth-key' + new Date().getTime());

ChatEngine.on('$.ready', (data) => {

    data.me.direct.onAny((a) => {
        console.log(a)
    })

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
