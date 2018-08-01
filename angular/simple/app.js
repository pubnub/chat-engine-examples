angular.module('chatApp', ['open-chat-framework'])
    .run(['$rootScope', 'ngChatEngine', function($rootScope, ngChatEngine) {

        $rootScope.ChatEngine = ChatEngineCore.create({
            publishKey: 'pub-c-01491c54-379f-4d4a-b20b-9a03c24447c7',
            subscribeKey: 'sub-c-eaf4a984-4356-11e8-91e7-8ad1b2d46395'
        }, {
            debug: false,
            namespace: 'ce-ng-simple'
        });

        // bind open chat framework angular plugin
        ngChatEngine.bind($rootScope.ChatEngine);

        // set a global array of chatrooms
        $rootScope.chats = [];

    }])
    .controller('Chat', function($scope) {

        console.log($scope.chat.chatEngine.chats)
        console.log('chat controller!', $scope.chat)

        $scope.chat.plugin(ChatEngineCore.plugin['chat-engine-typing-indicator']({
            timeout: 5000
        }));

        // every chat has a list of messages
        $scope.messages = [];

        // we store the id of the lastSender
        $scope.lastSender = null;

        // leave a chatroom and remove from global chat list
        $scope.leave = (index) => {
            $scope.chat.leave();
            $scope.chats.splice(index, 1);
        }

        // send a message using the messageDraft input
        $scope.sendMessage = () => {
            $scope.chat.emit('message', {
                text: $scope.messageDraft
            });
            $scope.messageDraft = '';
        }

        // when we get notified of a user typing
        $scope.chat.on('$typingIndicator.startTyping', (event) => {
            event.sender.isTyping = true;
        });

        // when we get notified a user stops typing
        $scope.chat.on('$typingIndicator.stopTyping', (event) => {
            event.sender.isTyping = false;
        });

        // function to add a message to messages array
        let addMessage = (payload, isHistory) => {

            // if this message was from a history call
            payload.isHistory = isHistory;

            // if the last message was sent from the same user
            payload.sameUser = $scope.messages.length > 0 && payload.sender.uuid == $scope.messages[$scope.messages.length - 1].sender.uuid;

            // if this message was sent by this client
            payload.isSelf = payload.sender.uuid == $scope.me.uuid;

            // add the message to the array
            $scope.messages.push(payload);

        }

        $scope.chat.on('$.connected', () => {

            // if this chat receives a message that's not from this sessions
            $scope.chat.search({
                event: 'message'
            }).on('message', function(payload) {
                // render it in the DOM with a special class
                addMessage(payload, true);
            });

        });

        // when this chat gets a message
        $scope.chat.on('message', function(payload) {
            // render it in the DOM
            addMessage(payload, false);
        });

        $scope.chat.connect();

    })
    .controller('OnlineUser', function($scope) {

        // create a new chat
        $scope.newChat = function(user) {

            // define a channel
            let chan = new Date().getTime();

            // create a new chat with that channel
            let newChat = new $scope.ChatEngine.Chat(chan, {autoConnect: false});

            // we need to auth ourselves before we can invite others
            newChat.on('$.connected', () => {
                // this fires a private invite to the user
                newChat.invite(user);
            });

            // add the chat to the list
            $scope.chats.push(newChat);

        };

    })
    .controller('ChatAppController', function($scope) {


        // create a user for myself and store as ```me```
        $scope.ChatEngine.connect(new Date().getTime(), 'auth-key');

        $scope.ChatEngine.on('$.ready', (data) => {

            $scope.me = data.me;

            $scope.me.plugin(ChatEngineCore.plugin['chat-engine-random-username']($scope.ChatEngine.global));

            $scope.ChatEngine.global.plugin(ChatEngineCore.plugin['chat-engine-online-user-search']({
                prop: ['states', $scope.ChatEngine.global.channel, 'username']
            }));

            // when I get a private invit
            $scope.me.direct.on('$.invite', (payload) => {

                let chat = new $scope.ChatEngine.Chat(payload.data.channel, {autoConnect: false});

                // create a new chat and render it in DOM
                $scope.chats.push(chat);

            });

            // bind chat to updates
            $scope.chat = $scope.ChatEngine.global;

            // hide / show usernames based on input
            $scope.userSearch = {
                input: '',
                fire: () => {

                    // get a list of our matching users
                    let found = $scope.ChatEngine.global.onlineUserSearch.search($scope.userSearch.input);

                    // hide every user
                    for(let uuid in $scope.chat.users) {
                        $scope.chat.users[uuid].hideWhileSearch = true;
                    }

                    // show all found users
                    for(let i in found) {
                        $scope.chat.users[found[i].uuid].hideWhileSearch = false;
                    }

                }
            };

            $scope.userAdd = {
                input: '',
                users: $scope.userAdd,
                fire: () => {
                    if($scope.userAdd.input.length) {
                        $scope.userAdd.users = $scope.ChatEngine.global.onlineUserSearch.search($scope.userAdd.input);
                    } else {
                        $scope.userAdd.users = [];
                    }
                }
            };

        });

    });
