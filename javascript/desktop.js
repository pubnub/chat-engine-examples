// Be sure to replace empty strings with your own App's Publish & Subscribe keys
// otherwise the demo keys will be used.
let userPubKey = '' || 'pub-c-d8599c43-cecf-42ba-a72f-aa3b24653c2b';
let userSubKey = '' || 'sub-c-6c6c021c-c4e2-11e7-9628-f616d8b03518';

var generatePerson = function(online) {

    var person = {};

    var names = "Vincent Porter Aiden Chavez Mike Thomas Erica Hughes Ginger Johnston Tracy Carpenter Stephen Blum Christian Kelly Monica Ward Todd Green Ian Jennings Dean Henry Peyton Mckinney".split(" ");

    var avatars = [
        'https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01.jpg',
        'https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_02.jpg',
        'https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_03.jpg',
        'https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_04.jpg',
        'https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_05.jpg',
        'https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_06.jpg',
        'https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_07.jpg',
        'https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_08.jpg',
        'https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_09.jpg',
        'https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_10.jpg'
    ];

    person.first = names[Math.floor(Math.random() * names.length)];
    person.last = names[Math.floor(Math.random() * names.length)];

    if (!online) {
        person.last = '(Simulated)';
    }

    person.full = [person.first, person.last].join(" ");
    person.uuid = new Date().getTime();

    person.avatar = avatars[Math.floor(Math.random() * avatars.length)];

    person.online = online || false;

    person.lastSeen = Math.floor(Math.random() * 60);

    return person;

}


var app = {
    messageToSend: '',
    ChatEngine: false,
    me: false,
    chat: false,
    users: [],
    messages: [],
    init: function() {

        // Make sure to import ChatEngine first!
        this.ChatEngine = ChatEngineCore.create({
            publishKey: userPubKey,
            subscribeKey: userSubKey
        }, {
            // this can make your broswer slooow
            debug: true,
            globalChannel: 'chat-engine-desktop-demo'
        });

        let newPerson = generatePerson(true);

        this.ChatEngine.connect(newPerson.uuid, newPerson);

        this.cacheDOM();

        this.ChatEngine.on('$.ready', function(data) {
            app.ready(data);
            app.simulateOfflineUsers();
            app.bindMessages();
            app.bindUsers();
        });

    },
    simulateOfflineUsers: function() {

        for (var j = 3; j > 0; j--) {
            var tempPerson = generatePerson(false);

            var ceTemp = new this.ChatEngine.User(tempPerson.uuid, tempPerson);

            this.users.push(ceTemp)
        }

        this.renderUsers();

    },
    ready: function(data) {
        this.me = data.me;
        this.chat = new this.ChatEngine.Chat('chatengine-meta');

        // UNCOMMENT code below to leverage PubNub's MSG History feature
        // this.chat.on('$.connected', () => {
        //
        //     // search for 50 old `message` events
        //     this.chat.search({
        //         'reverse': true,
        //         event: 'message',
        //         limit: 50
        //     }).on('message', (data) => {
        //       // when messages are returned, render them like normal messages
        //       app.renderMessage(data, true);
        //
        //     });
        //
        // });

        // UNCOMMENT code below to enbale the 'markdown-plugin'
        // const markdown = ChatEngineCore.plugin['chat-engine-markdown']();
        // this.chat.plugin(markdown);

        this.bindEvents();

        // add the typing indicator plugin
        let config = { timeout: 2000 };
        const typingIndicator = ChatEngineCore.plugin['chat-engine-typing-indicator'](config);
        this.chat.plugin(typingIndicator);

        this.renderUserTyping();
    },
    cacheDOM: function() {
        this.$chatHistory = $('.chat-history');
        this.$button = $('button');
        this.$textarea = $('#message-to-send');
        this.$chatHistoryList = this.$chatHistory.find('ul');
    },
    bindEvents: function() {

        this.$button.on('click', this.sendMessage.bind(this));
        this.$textarea.on('keyup', this.sendMessageEnter.bind(this));

    },
    bindMessages: function() {

        this.chat.on('message', function(message) {
            app.renderMessage(message);
        });

    },
    // add PubNub - Presence to display users [online|offline] state
    bindUsers: function() {

        // UNCOMMENT the code below to leverage PubNub's Presence feature
        // when a user comes online, render them in the online list
        // this.chat.on('$.online.*', function(data) {
        //     app.users.unshift(data.user);
        //     app.renderUsers();
        // });
        //
        // // when a user goes offline, remove them from the online list
        // this.chat.on('$.offline.*', function(data) {
        //
        //     for (var i in app.users) {
        //         if (app.users[i].uuid == data.user.uuid) {
        //             delete app.users[i];
        //         }
        //     }
        //
        //     app.renderUsers();
        //
        // });

    },
    renderUserTyping: function() {

        this.chat.on('$typingIndicator.stopTyping', (payload) => {
            $('#typing').empty();
        })

        this.chat.on('$typingIndicator.startTyping', (payload) => {
            console.debug(payload);
            $('#typing').html(payload.sender.uuid + ' is typing...');
        })
    },
    renderUsers: function() {

        var peopleTemplate = Handlebars.compile($("#person-template").html());
        var user = false;

        $('#people-list ul').empty();
        this.users.forEach(function(user) {

            $('#people-list ul').append(peopleTemplate(user.state));
        });

    },
    renderMessage: function(message) {

        var meTemp = Handlebars.compile($("#message-template").html());
        var userTemp = Handlebars.compile($("#message-response-template").html());

        var template = userTemp;

        if (message.sender.uuid == app.me.uuid) {
            template = meTemp;
        }

        var context = {
            messageOutput: message.data.text,
            time: app.getCurrentTime(),
            user: message.sender.state
        };

        app.$chatHistoryList.append(template(context));

        this.scrollToBottom();

    },

    sendMessage: function() {

        this.messageToSend = this.$textarea.val()

        if (this.messageToSend.trim() !== '') {
            this.$textarea.val('');
            this.chat.emit('message', {
                text: this.messageToSend
            });
        }

    },
    sendMessageEnter: function(event) {

        // enter was pressed
        if (event.keyCode === 13) {
            this.sendMessage();
        } else {
            this.chat.typingIndicator.startTyping();
        }
    },
    scrollToBottom: function() {
        this.$chatHistory.scrollTop(this.$chatHistory[0].scrollHeight);
    },
    getCurrentTime: function() {
        return new Date().toLocaleTimeString().
        replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3");
    },
    getRandomItem: function(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }

};

app.init();
