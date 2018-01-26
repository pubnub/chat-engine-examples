const now = new Date().getTime();
const username = ['user', now].join('-');

const onlineOutput = document.getElementById('online-list');

const ChatEngine = ChatEngineCore.create({
    publishKey: 'pub-c-d8599c43-cecf-42ba-a72f-aa3b24653c2b',
    subscribeKey: 'sub-c-6c6c021c-c4e2-11e7-9628-f616d8b03518'
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
