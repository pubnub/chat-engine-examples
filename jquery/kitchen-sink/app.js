let me;
let ChatEngine;

const $chatTemplate = function(chat) {

    let html =
        '<div class="chat col-xs-12" id="' + chat.channel.replace(/[^a-zA-Z 0-9]+/g, '') + '">' +
        '<div class="card">' +
        '<div class="card-header">' +
        '<div class="col-sm-6">' +
        chat.channel +
        '</div>' +
        '<div class="col-sm-6 text-right">' +
        '<a href="" class="close">x</a>' +
        '</div>' +
        '</div>' +

        '<ul class="online-list-sub list-group list-group-flush"></ul>' +
        '<div class="card-block">' +
        '<div class="log"></div>' +
        '<p class="typing text-muted"></p>' +
        '<form class="send-message">' +
        '<div class="input-group">' +
        '<input type="text" class="form-control message" placeholder="Your Message...">' +
        '<span class="input-group-btn">' +
        '<button class="btn btn-primary" type="submit">Send</button>' +
        '</span>' +
        '</div>' +
        '</form>' +
        '</div>' +
        '</div>' +
        '</div>';

    // define a HTML template for the new chatroom
    return $(html);

};

const $messageTemplate = function(payload, classes) {

    let html =
        '<div class="' + classes + '">' +
        '<p class="text-muted username">' + payload.sender.state().username + '</p>' +
        '<p>' + payload.data.text + '</p>' +
        '</div>';

    return $(html);
}

const $userTemplate = function(user, chat) {

    // create the HTML template 9 the user
    let html =
        '<li class="' + user.uuid + ' list-group-item">';

    if(user.uuid !== me.uuid) {
        html +=
            '<a href="">' + user.state().username + '</a> ';
    } else {
        html +=
            '<strong>' + user.state().username + '</strong> ';
    }


    html +=
        '<span class="show-typing">is typing...</span>' +
        '</li>';

    return $(html);

}

// function to create concept of "me"
const identifyMe = function(username) {

    if(!username) {
        me.plugin(ChatEngineCore.plugin['chat-engine-random-username']());
    } else {
        me.update({username: username})
    }

    // when I get a private invite
    me.direct.on('$.invite', (payload) => {
        // create a new chat and render it in DOM
        renderChat(new ChatEngine.Chat(payload.data.channel));
    });

    // render the value of me in the GUI
    $('#me').text(me.state().username + ' with uuid: ' + me.uuid);

}

// GUI render functions

// render a ChatEngine.User object in a list
const renderUser = function($el, user) {

    // render user in this chat with their state from global
    let $tpl = $userTemplate(user, ChatEngine.global);

    // listen for a click on the user
    $tpl.find('a').click(() => {

        // define a channel using the clicked user's username and this client's username
        let chan = [user.uuid, me.uuid].sort().join('#');

        // create a new chat with that channel
        let newChat = new ChatEngine.Chat(chan);
        newChat.on('$.connected', () => {

            // this fires a private invite to the user
            newChat.invite(user);
            renderChat(newChat);

        });

        return false;

    });

    // hide "is typingIndicator..." by defualt
    $tpl.find('.show-typing').hide();

    return $tpl;

};

const updateUser = function(user) {

    let $el = $('body').find('.' + user.uuid);
    $el.replaceWith(renderUser($el, user));

}

const userExists = function($el, user) {
    return $el.find('.' + user.uuid).length > 0;
}

// turn ChatEngine.Chat into an online list
const renderOnlineList = function($el, chat) {

    // when someone joins the chat
    chat.on('$.online.*', (payload) => {

        if(!userExists($el, payload.user)) {
            // render the user in the online list and bind events
            $el.append(renderUser($el, payload.user));
        }

    });

    chat.on('$.offline.*', (payload) => {
        $el.find('.' + payload.user.uuid).remove();
    });

    chat.plugin(ChatEngineCore.plugin['chat-engine-typing-indicator']({
        timeout: 1000
    }));

}

// turn ChatEngine.Chat into a chatroom
const renderChat = function(privateChat) {

    let $tpl = $chatTemplate(privateChat);

    // render the online list in the chatroom template
    renderOnlineList($tpl.find('.online-list-sub'), privateChat);

    // when someone types into the input box
    $tpl.find('.message').keypress((e) => {

        // if that keypress was not "Enter"
        if (e.which != 13) {

            // then tell ChatEngine this user is typing
            privateChat.typingIndicator.startTyping();
        }

    });

    // when someone submits a message
    $tpl.find('.send-message').submit(() => {

        // tell ChatEngine this user stopped typing
        privateChat.typingIndicator.stopTyping();

        // send the mssage over the network
        privateChat.emit('message', {
            text: $tpl.find('.message').val()
        });

        // empty the input
        $tpl.find('.message').val('');

        return false;

    });

    // store the uuid of the user who sent the last message
    let lastSender = null

    // render a new message in the dom
    let renderMessage = (payload, classes) => {

        // a list of extra classes for the message div
        classes = classes || '';

        // if I didn't send this message
        if (payload.sender.constructor.name !== "Me") {
            // render it on the right
            classes += ' text-xs-right'
        }

        // if the uuid of the user who sent this message is the same as the last
        if (lastSender == payload.sender.uuid) {
            // don't render the username again
            classes += ' hide-username';
        }

        // set the lastSender as the sender's uuid
        lastSender = payload.sender.uuid;

        return $messageTemplate(payload, classes);

    }

    // when this chat gets a message
    privateChat.on('message', function(payload) {
        // append the message to the chatroom log
        $tpl.find('.log').append(renderMessage(payload, null));
    });

    privateChat.on('$.connect', () =>{

        // if this chat receives a message that's not from this sessions
        privateChat.search({
            event: 'message',
            limit: 10
        }).on('message', function(payload) {
            // prepend because we go backward
            $tpl.find('.log').prepend(renderMessage(payload, 'text-muted'));
        });

    });

    // when this chat gets the typing event
    privateChat.on('$typingIndicator.startTyping', (payload) => {

        // write some text saying that user is typing
        $tpl.find('.typing').text(payload.sender.state().username + ' is typing...');

        // and show their typing indication next to their name in any other location
        $tpl.find('.' + payload.sender.uuid).find('.show-typing').show();

    });

    // when this chat gets notified someone stopped typing
    privateChat.on('$typingIndicator.stopTyping', (payload) => {

        // remove the indication text for this chat
        $tpl.find('.typing').text('');

        // and remove their indication in any other location on the page
        $('.' + payload.sender.uuid).find('.show-typing').hide();

    });

    // when someone closes a private chat
    $tpl.find('.close').click(() => {
        // remove the element from the DOM
        privateChat.leave();

        return false;

    });

    // append the chat to the DOM
    $('#chats').append($tpl);

}

// bind the input from the search bar to the usernameSearch plugin
const bindUsernamePlugin = function() {

    ChatEngine.global.plugin(ChatEngineCore.plugin['chat-engine-online-user-search']({
        prop: ['states', ChatEngine.global.channel, 'username']
    }));

    // when someone types in the username search
    $('#usernameSearch').on('change keyup paste click blur', () => {

        // get the full value of what they typed
        let val = $('#usernameSearch').val();

        // if the value is set
        if (val) {

            // call the plugin function to find out if that search query
            // matches anyone's username
            let online = ChatEngine.global.onlineUserSearch.search(val);

            // hide all the users
            $('#online-list').find('.list-group-item').hide();

            // loop through all the matching users
            online.forEach(function(user) {
                // and show them
                $('#online-list').find('.' + user.uuid).show();
            });

        } else {

            // if value is not set, show all users
            $('#online-list').find('.list-group-item').show();

        }

    });

}

// ChatEngine Configure
ChatEngine = ChatEngineCore.create({
    publishKey: 'pub-c-01491c54-379f-4d4a-b20b-9a03c24447c7',
    subscribeKey: 'sub-c-eaf4a984-4356-11e8-91e7-8ad1b2d46395'
 }, {
    namespace: 'jq-ks',
    enableSync: true,
    debug: false
});

let username = window.location.hash.substr(1);

// create a user for myself and store as ```me```
ChatEngine.connect(username || new Date().getTime().toString(), 'auth-key');

ChatEngine.on('$.session.chat.join', (data) => {

    if(data.chat.group == 'default') {
        renderChat(data.chat);
        data.chat.connect();
    }
});

ChatEngine.on('$.ready', (data) => {

    me = data.me;

    // set up the concept of me and global
    identifyMe(username);

    // render the ChatEngine.global now that it's defined
    // this onlineList can spawn other chats
    renderOnlineList($('#online-list'), ChatEngine.global);

    // plug the search bar into the username plugin
    bindUsernamePlugin();

    me.session.on('$.chat.join', (data) => {

        if(data.chat.group == 'custom') {
            renderChat(data.chat);
            data.chat.connect();
        }

    });
    me.session.on('$.chat.leave', (data) => {
        $('#' + data.chat.channel.replace(/[^a-zA-Z 0-9]+/g, '')).remove();
    });

});

ChatEngine.on('$.state()', (payload) => {
    updateUser(payload.user);
});
