// WARNING: PUBNUB KEYS REQUIRED FOR EXAMPLE TO FUNCTION
const PUBLISH_KEY = '';
const SUBSCRIBE_KEY = '';

// just making sure you're paying attention
if (PUBLISH_KEY === '' || SUBSCRIBE_KEY === '') {
    throw new Error('You forgot to enter your keys')
}

const now = new Date().getTime();
const username = ['user', now].join('-');

const onlineOutput = document.getElementById('online-list');

const ChatEngine = ChatEngineCore.create({
    publishKey: PUBLISH_KEY,
    subscribeKey: SUBSCRIBE_KEY
}, {
    debug: true,
    globalChannel: 'chat-engine-online-example'
});

ChatEngine.on('$.ready', () => {

    let onlineEvents = 0;

    ChatEngine.global.on('$.online.*', (payload) => {

        let div = document.createElement("li");
        div.innerHTML = payload.user.uuid;
        div.className += " list-group-item";
        onlineOutput.appendChild(div);

        onlineEvents++;

    });

    setInterval(function() {
        console.log('users online', ChatEngine.global.users);
    }, 1000);

});

ChatEngine.connect(username, {
    signedOnTime: now
}, 'auth-key');
