const now = new Date().getTime();
const username = ['user', now].join('-');

const onlineOutput = document.getElementById('online-list');

const ChatEngine = ChatEngineCore.create({
    publishKey: 'pub-c-01491c54-379f-4d4a-b20b-9a03c24447c7',
    subscribeKey: 'sub-c-eaf4a984-4356-11e8-91e7-8ad1b2d46395'
}, {
    debug: false
});

ChatEngine.on('$.ready', () => {

    let onlineEvents = 0;

    let newChat = new ChatEngine.Chat('online-list-example');

    newChat.on('$.online.here', (payload) => {

        let div = document.createElement("li");
        div.innerHTML = payload.user.uuid;
        div.className += " list-group-item";
        onlineOutput.appendChild(div);

        onlineEvents++;

    });

});

ChatEngine.connect(username, 'auth-key');
