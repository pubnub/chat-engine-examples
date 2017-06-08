angular.module('open-chat-framework', [])
.service('ngChatEngine', ['$timeout', function($timeout) {

    this.bind = function(ChatEngine) {

        // updates angular when anything changes
        ChatEngine.onAny(function(event, payload) {
            $timeout(function() {});
        });

    }

}]);
