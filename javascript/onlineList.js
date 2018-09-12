const now = new Date().getTime();
const username = ['user', now].join('-');

const onlineOutput = document.getElementById('online-list');

const ChatEngine = ChatEngineCore.create({
    publishKey: 'pub-c-9610cbd6-4221-40f6-8200-35de43c44033',
    subscribeKey: 'sub-c-6ce891f2-b603-11e8-8fd2-4a2bdf4876be'
}, {
    debug: false
});

let newChat;

ChatEngine.on('$.ready', () => {

    let onlineEvents = 0;

    newChat = new ChatEngine.Chat('online-list-example');

    newChat.on('$.online.*', (payload) => {

        let div = document.createElement("li");
        div.innerHTML = payload.user.uuid;
        div.id = payload.user.uuid;
        div.className += " list-group-item";
        onlineOutput.appendChild(div);

        onlineEvents++;

    });

    newChat.on('$.offline.*', (payload) => {

        var elem = document.getElementById(payload.user.uuid);
        return elem.parentNode.removeChild(elem);

    });

});

ChatEngine.connect(username, 'auth-key-2');

let leave = () => {
    newChat.leave();
}
