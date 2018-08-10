let sounds = {
    send: new Audio("send.wav"),
    broadcast: new Audio("broadcast.wav")
};

angular.module('chatApp', ['open-chat-framework', 'auth0.lock', 'ui.router', 'ngSanitize', 'ng-uploadcare'])
    .config(function(lockProvider) {

        lockProvider.init({
          clientID: 'BiY_C0X0jFeVZ8KlxFqMKwT1xrn96xTM',
          domain: 'pubnub-ocf.auth0.com',
            options: {
              _idTokenVerification: false
            }
        });

    })
    .run(function($rootScope, lock, Me, ChatEngine, $state, $timeout) {

        // For use with UI Router
        lock.interceptHash();

        let profile = localStorage.getItem('profile');

        if(profile && profile.length) {
            profile = JSON.parse(profile);
        }

        lock.on('authenticated', function(authResult) {

            localStorage.setItem('access_token', authResult.accessToken);
            localStorage.setItem('id_token', authResult.idToken);

        });

        ChatEngine.on('$.ready', (me) => {
            Me.profile = me;
        });

    })
    .factory('Me', function() {

        return {
            profile: false
        }

    })
    .factory('ChatEngine', function(ngChatEngine) {

        // ChatEngine Configure
        const ChatEngine = ChatEngineCore.create({
            publishKey: 'pub-c-01491c54-379f-4d4a-b20b-9a03c24447c7',
            subscribeKey: 'sub-c-eaf4a984-4356-11e8-91e7-8ad1b2d46395'
        }, {
            debug: false,
            globalChannel: 'chat-engine-flowtron'
        });

        // bind open chat framework angular plugin
        ngChatEngine.bind(ChatEngine);

        return ChatEngine;

    })
    .config(function($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/dash/chat-engine-flowtron%23chat%23public.%23Main');

        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: 'views/login.html',
                controller: 'LoginCtrl'
            })
            .state('dash', {
                url: '/dash',
                templateUrl: 'views/dash.html',
                controller: 'ChatAppController',
                resolve: {
                    ready: function($timeout, $state, $q, lock, ChatEngine) {

                        var deferred = $q.defer();

                        lock.getProfile(localStorage.getItem('id_token'), function(error, profile) {

                            if (error || !profile) {
                                return $state.go('login');
                            } else {

                                localStorage.setItem('profile', JSON.stringify(profile));

                                ChatEngine.connect(profile.user_id, localStorage.getItem('access_token'), profile);

                                if(ChatEngine.ready) {
                                    deferred.resolve();
                                } else {
                                    ChatEngine.on('$.ready', function () {
                                        deferred.resolve();
                                    });
                                }
                            }

                        });

                        return deferred.promise;
                    }
                }
            })
            .state('dash.chat', {
                url: '/:channel',
                templateUrl: 'views/chat.html',
                controller: 'Chat'
            })
    })
    .factory('Rooms', function(ChatEngine, Me, $state) {

        let channels = ['Main', 'Portal', 'Blocks', 'Content', 'Support', 'Open Source', 'Client Eng', 'Docs', 'Marketing', 'Ops', 'Foolery'];

        let obj = {
            list: [],
            connect: false
        }

        obj.connect = () => {

            for(let i in channels) {
                obj.findOrCreate(channels[i])
            }

        }

        obj.find = (channel) => {

            let found = false;

            // if the chatroom is already in memory, use that one
            for(let i in obj.list) {
                if(obj.list[i].chat.channel == channel) {
                    found = obj.list[i];
                }
            }

            return found;

        }

        obj.findOrCreate = (channel) => {

            let foundRoom = obj.find(channel);

            if(foundRoom) {
                return foundRoom;
            } else {

                let room = {
                    name: channel,
                    chat: new ChatEngine.Chat(channel, {autoConnect: false}),
                    isGroup: channels.indexOf(channel) > -1,
                    messages: [],
                    typingUsers: []
                }

                room.chat.plugin(ChatEngineCore.plugin['chat-engine-emoji']());
                room.chat.plugin(ChatEngineCore.plugin['chat-engine-markdown']());
                room.chat.plugin(ChatEngineCore.plugin['chat-engine-typing-indicator']());
                room.chat.plugin(ChatEngineCore.plugin['chat-engine-unread-messages']());
                room.chat.plugin(ChatEngineCore.plugin['chat-engine-desktop-notifications']({
                    title: (event) => {
                        return 'New FlowTron Message In ' + room.name
                    },
                    message: (event) => {
                        return event.data.text;
                    },
                    icon: (event) => {
                        return '/examples/flowtron/logo@2x.png';
                    },
                    callback: (event) => {
                        $state.go('dash.chat', {channel: channel})
                        window.focus();
                    }
                }));

                // function to add a message to messages array
                let addMessage = (payload, type) => {

                    payload.type = type;

                    // if the last message was sent from the same user
                    payload.sameUser = room.messages.length > 0 && payload.sender.uuid == room.messages[room.messages.length - 1].sender.uuid;

                    // if this message was sent by this client
                    payload.isSelf = payload.sender.uuid == Me.profile.uuid;

                    if(!payload.isSelf && payload.type == 'message' || payload.type == 'history') {
                        sounds.broadcast.play();
                    }

                    if(type == 'history') {
                        // add the message to the array
                        room.messages.unshift(payload);
                    } else {
                        // add the message to the array
                        room.messages.push(payload);
                    }

                }

                room.chat.on('$.connected', () => {

                    room.chat.search()
                    .on('message', function(payload) {
                        addMessage(payload, 'history');
                    }).on('upload', function(payload) {
                        addMessage(payload, 'upload');
                    });

                });

                room.chat.on('message', function(payload) {

                    // render it in the DOM
                    addMessage(payload, 'message');
                });

                room.chat.on('upload', (payload) => {

                    addMessage(payload, 'upload');
                })

                let updateTyping = (user, isTyping) => {

                    let found = false;
                    for(let i in room.typingUsers) {

                        if(room.typingUsers[i].uuid == user.uuid) {

                            found = true;
                            if(!isTyping) {
                                room.typingUsers.splice(i, 1);
                            }

                        }

                    }

                    if(!found && isTyping) {
                        room.typingUsers.push(user);
                    }

                }

                room.chat.on('$typingIndicator.startTyping', (event) => {
                    updateTyping(event.sender, true);
                });
                room.chat.on('$typingIndicator.stopTyping', (event) => {
                    updateTyping(event.sender, false);
                });

                room.chat.connect();

                obj.list.push(room);

                return obj.list[obj.list.length - 1];

            }

        }

        return obj;

    })
    .controller('MainCtrl', function($scope, ChatEngine, Me) {
    })
    .controller('LoginCtrl', function($scope, lock, ChatEngine, Me, $state) {

        $scope.lock = lock;
        $scope.Me = Me;

        $scope.lock.show();

    })
    .controller('OnlineUser', function($scope, ChatEngine, Me, $state) {

        // create a new chat
        $scope.newChat = function(user) {

            // define a channel using the clicked user's username and this client's username
            let chan = [Me.profile.state.user_id, user.state.user_id].sort().join('#')

            // create a new chat with that channel
            let newChat = new ChatEngine.Chat(chan);

            newChat.on('$.connected', () => {

                // this fires a private invite to the user
                newChat.invite(user);

                $state.go('dash.chat', {channel: newChat.channel})

            });

        };

    })
    .controller('ChatAppController', function($scope, $state, $stateParams, ChatEngine, Me, Rooms) {

        Rooms.connect();

        $scope.rooms = Rooms.list;

        $scope.Me = Me;

        console.log($scope.Me)

        // bind chat to updates
        $scope.chat = ChatEngine.global;

        // when I get a private invite
        Me.profile.direct.on('$.invite', (payload) => {

            // create a new chat and render it in DOM
            $state.go('dash.chat', {channel: payload.data.channel});

        });

        ChatEngine.global.plugin(ChatEngineCore.plugin['chat-engine-online-user-search']({
            prop: ['states', ChatEngine.global, 'name']
        }));

        // hide / show usernames based on input
        $scope.userSearch = {
            input: '',
            fire: () => {

                // get a list of our matching users
                let found = ChatEngine.global.onlineUserSearch.search($scope.userSearch.input);

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

    })
    .controller('Chat', function($scope, $stateParams, ChatEngine, Me, $timeout, Rooms) {

        $scope.room = Rooms.findOrCreate($stateParams.channel);

        $scope.chat = $scope.room.chat;

        $scope.chat.unreadMessages.active();

        $scope.chat.on('message', () => {
            $scope.scrollToBottom();
        });

        $scope.chat.on('$.search.finish', () => {
            $scope.scrollToBottom();
        });

        $scope.uploadcare = {
            show: false,
            value: '',
            callback: (data) => {
                $scope.chat.emit('upload', data);
                $scope.uploadcare.show = false;
            }
        };

        // we store the id of the lastSender
        $scope.lastSender = null;

        // leave a chatroom and remove from global chat list
        $scope.leave = (index) => {
            $scope.chat.leave();
        }

        $scope.isTyping = () => {

            if($scope.messageDraft.text) {
                $scope.chat.typingIndicator.startTyping();
            } else {
                $scope.chat.typingIndicator.stopTyping();
            }

        }

        $scope.chat.on('$typingIndicator.*', (event) => {
            $scope.scrollToBottom();
        });

        $scope.messageDraft = {
            text: '',
            suggestedEmoji: []
        }

        $scope.$watch('messageDraft.text', (newv, oldv) => {

            let words = newv.split(' ');
            let lastWord = words[words.length -1];

            if(lastWord[0] == ':' && lastWord[lastWord.length -1] !== ':') {
                $scope.messageDraft.suggestedEmoji = $scope.chat.emoji.search(lastWord);
            } else {
                $scope.messageDraft.suggestedEmoji = [];
            }

        });

        $scope.completeEmoji = (emoji) => {
            $scope.messageDraft.text = $scope.messageDraft.text.substring(0, $scope.messageDraft.text.lastIndexOf(" "));
            $scope.messageDraft.text = [$scope.messageDraft.text, emoji].join(' ');
        }

        // send a message using the messageDraft input
        $scope.sendMessage = () => {

            if($scope.messageDraft.text) {

                sounds.send.play();

                $scope.chat.emit('message', {
                    text: $scope.messageDraft.text,
                    date: new Date()
                });

                $scope.messageDraft.text = '';

            }

        }

        $scope.scrollToBottom = () => {

            $timeout(function() {
              var scroller = document.getElementById("log");
              scroller.scrollTop = scroller.scrollHeight;
            }, 0, false);

        }
        $scope.scrollToBottom();

        $scope.$on('$destroy', function() {
            $scope.chat.unreadMessages.inactive();
        });

    });
