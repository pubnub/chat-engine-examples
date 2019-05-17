const now = new Date().getTime();
const username = ['user', now].join('-');
const textInput = document.getElementById('chat-input');
const textOutput = document.getElementById('chat-output');

// WARNING: PUBNUB KEYS REQUIRED FOR EXAMPLE TO FUNCTION
const PUBLISH_KEY = '';
const SUBSCRIBE_KEY = '';

// just making sure you're paying attention
if (PUBLISH_KEY === '' || SUBSCRIBE_KEY === '') {
    throw new Error('You forgot to enter your keys')
}

let sendChat = function() {}; // will be filled in when ChatEngine connects

const ChatEngine = ChatEngineCore.create({
    publishKey: PUBLISH_KEY,
    subscribeKey: SUBSCRIBE_KEY
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
