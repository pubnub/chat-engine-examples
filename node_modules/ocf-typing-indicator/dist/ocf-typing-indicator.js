(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function() {

    const package = require('../package.json');
    window.OpenChatFramework.plugin[package.name] = require('../src/plugin.js');

})();

},{"../package.json":2,"../src/plugin.js":3}],2:[function(require,module,exports){
module.exports={
  "author": "Ian Jennings",
  "name": "ocf-typing-indicator",
  "version": "0.0.2",
  "main": "src/plugin.js",
  "open-chat-framework": {
    "namespace": "typing-indicator"
  },
  "dependencies": {
    "ocf": "^0.0.4"
  }
}

},{}],3:[function(require,module,exports){
module.exports = (config) => {

    // set the default for typing
    // if the client types input, we wont fire "stopTyping" unless the client
    // doesn't type anything for this timeout
    config = config || {timeout: 1000};

    // create a place to store the setTimeout in
    let stopTypingTimeout = null;

    // define the methods that will be attached to the class Chat
    class extension  {
        construct() {

            // keep comms on a new channel so we don't flood chat channel
            this.chat = new this.OCF.Chat(this.parent.channel + '.$' + 'typingIndicator');

            // forward events via broadcast
            this.chat.on('$typingIndicator.startTyping', (event) => {
                this.parent.trigger('$typingIndicator.startTyping', event);
            });

            this.chat.on('$typingIndicator.stopTyping', (event) => {
                this.parent.trigger('$typingIndicator.stopTyping', event);
            });

            // will set Chat.typing.isTyping to false immediately
            this.isTyping = false;

        }
        startTyping() {

            // this is called manually by the client

            // set boolean that we're in middle of typing
            this.isTyping = true;

            // emit an event over the network that this user started typing
            this.chat.emit(['$' + 'typingIndicator', 'startTyping'].join('.'));

            // kill any existing timeouts
            clearTimeout(stopTypingTimeout);

            // create a new timeout
            stopTypingTimeout = setTimeout (() => {

                // trigger stop typing after a set amount of time
                this.stopTyping();

            }, config.timeout);

        }
        stopTyping() {

            // we must be currently typing to stop typing
            // if(this.isTyping) {

                // remove the timeout
                clearTimeout(stopTypingTimeout);

                // broadcast a stoptyping event
                this.chat.emit(['$' + 'typingIndicator', 'stopTyping'].join('.'));

                // stop typing indicator
                this.isTyping = false;

            // }

        }
    }

    // define emit middleware
    let emit = {
        message: (payload, next) => {

            // it's worth noting here, we can't access ```extension``` here
            // because this function runs in a different context

            // on every message, tell the chat to stop typing
            payload.chat.typingIndicator.stopTyping();

            // continue on
            next(null, payload);
        }
    };

    // define both the extended methods and the middleware in our plugin
    return {
        namespace: 'typingIndicator',
        extends: {
            Chat: extension,
            GlobalChat: extension
        },
        middleware: {
            emit
        }
    }


}

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy5udm0vdmVyc2lvbnMvbm9kZS92Ni43LjAvbGliL25vZGVfbW9kdWxlcy9vY2YtcGx1Z2luL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIudG1wL3dyYXAuanMiLCJwYWNrYWdlLmpzb24iLCJzcmMvcGx1Z2luLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIoZnVuY3Rpb24oKSB7XG5cbiAgICBjb25zdCBwYWNrYWdlID0gcmVxdWlyZSgnLi4vcGFja2FnZS5qc29uJyk7XG4gICAgd2luZG93Lk9wZW5DaGF0RnJhbWV3b3JrLnBsdWdpbltwYWNrYWdlLm5hbWVdID0gcmVxdWlyZSgnLi4vc3JjL3BsdWdpbi5qcycpO1xuXG59KSgpO1xuIiwibW9kdWxlLmV4cG9ydHM9e1xuICBcImF1dGhvclwiOiBcIklhbiBKZW5uaW5nc1wiLFxuICBcIm5hbWVcIjogXCJvY2YtdHlwaW5nLWluZGljYXRvclwiLFxuICBcInZlcnNpb25cIjogXCIwLjAuMlwiLFxuICBcIm1haW5cIjogXCJzcmMvcGx1Z2luLmpzXCIsXG4gIFwib3Blbi1jaGF0LWZyYW1ld29ya1wiOiB7XG4gICAgXCJuYW1lc3BhY2VcIjogXCJ0eXBpbmctaW5kaWNhdG9yXCJcbiAgfSxcbiAgXCJkZXBlbmRlbmNpZXNcIjoge1xuICAgIFwib2NmXCI6IFwiXjAuMC40XCJcbiAgfVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSAoY29uZmlnKSA9PiB7XG5cbiAgICAvLyBzZXQgdGhlIGRlZmF1bHQgZm9yIHR5cGluZ1xuICAgIC8vIGlmIHRoZSBjbGllbnQgdHlwZXMgaW5wdXQsIHdlIHdvbnQgZmlyZSBcInN0b3BUeXBpbmdcIiB1bmxlc3MgdGhlIGNsaWVudFxuICAgIC8vIGRvZXNuJ3QgdHlwZSBhbnl0aGluZyBmb3IgdGhpcyB0aW1lb3V0XG4gICAgY29uZmlnID0gY29uZmlnIHx8IHt0aW1lb3V0OiAxMDAwfTtcblxuICAgIC8vIGNyZWF0ZSBhIHBsYWNlIHRvIHN0b3JlIHRoZSBzZXRUaW1lb3V0IGluXG4gICAgbGV0IHN0b3BUeXBpbmdUaW1lb3V0ID0gbnVsbDtcblxuICAgIC8vIGRlZmluZSB0aGUgbWV0aG9kcyB0aGF0IHdpbGwgYmUgYXR0YWNoZWQgdG8gdGhlIGNsYXNzIENoYXRcbiAgICBjbGFzcyBleHRlbnNpb24gIHtcbiAgICAgICAgY29uc3RydWN0KCkge1xuXG4gICAgICAgICAgICAvLyBrZWVwIGNvbW1zIG9uIGEgbmV3IGNoYW5uZWwgc28gd2UgZG9uJ3QgZmxvb2QgY2hhdCBjaGFubmVsXG4gICAgICAgICAgICB0aGlzLmNoYXQgPSBuZXcgdGhpcy5PQ0YuQ2hhdCh0aGlzLnBhcmVudC5jaGFubmVsICsgJy4kJyArICd0eXBpbmdJbmRpY2F0b3InKTtcblxuICAgICAgICAgICAgLy8gZm9yd2FyZCBldmVudHMgdmlhIGJyb2FkY2FzdFxuICAgICAgICAgICAgdGhpcy5jaGF0Lm9uKCckdHlwaW5nSW5kaWNhdG9yLnN0YXJ0VHlwaW5nJywgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5wYXJlbnQudHJpZ2dlcignJHR5cGluZ0luZGljYXRvci5zdGFydFR5cGluZycsIGV2ZW50KTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB0aGlzLmNoYXQub24oJyR0eXBpbmdJbmRpY2F0b3Iuc3RvcFR5cGluZycsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMucGFyZW50LnRyaWdnZXIoJyR0eXBpbmdJbmRpY2F0b3Iuc3RvcFR5cGluZycsIGV2ZW50KTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvLyB3aWxsIHNldCBDaGF0LnR5cGluZy5pc1R5cGluZyB0byBmYWxzZSBpbW1lZGlhdGVseVxuICAgICAgICAgICAgdGhpcy5pc1R5cGluZyA9IGZhbHNlO1xuXG4gICAgICAgIH1cbiAgICAgICAgc3RhcnRUeXBpbmcoKSB7XG5cbiAgICAgICAgICAgIC8vIHRoaXMgaXMgY2FsbGVkIG1hbnVhbGx5IGJ5IHRoZSBjbGllbnRcblxuICAgICAgICAgICAgLy8gc2V0IGJvb2xlYW4gdGhhdCB3ZSdyZSBpbiBtaWRkbGUgb2YgdHlwaW5nXG4gICAgICAgICAgICB0aGlzLmlzVHlwaW5nID0gdHJ1ZTtcblxuICAgICAgICAgICAgLy8gZW1pdCBhbiBldmVudCBvdmVyIHRoZSBuZXR3b3JrIHRoYXQgdGhpcyB1c2VyIHN0YXJ0ZWQgdHlwaW5nXG4gICAgICAgICAgICB0aGlzLmNoYXQuZW1pdChbJyQnICsgJ3R5cGluZ0luZGljYXRvcicsICdzdGFydFR5cGluZyddLmpvaW4oJy4nKSk7XG5cbiAgICAgICAgICAgIC8vIGtpbGwgYW55IGV4aXN0aW5nIHRpbWVvdXRzXG4gICAgICAgICAgICBjbGVhclRpbWVvdXQoc3RvcFR5cGluZ1RpbWVvdXQpO1xuXG4gICAgICAgICAgICAvLyBjcmVhdGUgYSBuZXcgdGltZW91dFxuICAgICAgICAgICAgc3RvcFR5cGluZ1RpbWVvdXQgPSBzZXRUaW1lb3V0ICgoKSA9PiB7XG5cbiAgICAgICAgICAgICAgICAvLyB0cmlnZ2VyIHN0b3AgdHlwaW5nIGFmdGVyIGEgc2V0IGFtb3VudCBvZiB0aW1lXG4gICAgICAgICAgICAgICAgdGhpcy5zdG9wVHlwaW5nKCk7XG5cbiAgICAgICAgICAgIH0sIGNvbmZpZy50aW1lb3V0KTtcblxuICAgICAgICB9XG4gICAgICAgIHN0b3BUeXBpbmcoKSB7XG5cbiAgICAgICAgICAgIC8vIHdlIG11c3QgYmUgY3VycmVudGx5IHR5cGluZyB0byBzdG9wIHR5cGluZ1xuICAgICAgICAgICAgLy8gaWYodGhpcy5pc1R5cGluZykge1xuXG4gICAgICAgICAgICAgICAgLy8gcmVtb3ZlIHRoZSB0aW1lb3V0XG4gICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHN0b3BUeXBpbmdUaW1lb3V0KTtcblxuICAgICAgICAgICAgICAgIC8vIGJyb2FkY2FzdCBhIHN0b3B0eXBpbmcgZXZlbnRcbiAgICAgICAgICAgICAgICB0aGlzLmNoYXQuZW1pdChbJyQnICsgJ3R5cGluZ0luZGljYXRvcicsICdzdG9wVHlwaW5nJ10uam9pbignLicpKTtcblxuICAgICAgICAgICAgICAgIC8vIHN0b3AgdHlwaW5nIGluZGljYXRvclxuICAgICAgICAgICAgICAgIHRoaXMuaXNUeXBpbmcgPSBmYWxzZTtcblxuICAgICAgICAgICAgLy8gfVxuXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBkZWZpbmUgZW1pdCBtaWRkbGV3YXJlXG4gICAgbGV0IGVtaXQgPSB7XG4gICAgICAgIG1lc3NhZ2U6IChwYXlsb2FkLCBuZXh0KSA9PiB7XG5cbiAgICAgICAgICAgIC8vIGl0J3Mgd29ydGggbm90aW5nIGhlcmUsIHdlIGNhbid0IGFjY2VzcyBgYGBleHRlbnNpb25gYGAgaGVyZVxuICAgICAgICAgICAgLy8gYmVjYXVzZSB0aGlzIGZ1bmN0aW9uIHJ1bnMgaW4gYSBkaWZmZXJlbnQgY29udGV4dFxuXG4gICAgICAgICAgICAvLyBvbiBldmVyeSBtZXNzYWdlLCB0ZWxsIHRoZSBjaGF0IHRvIHN0b3AgdHlwaW5nXG4gICAgICAgICAgICBwYXlsb2FkLmNoYXQudHlwaW5nSW5kaWNhdG9yLnN0b3BUeXBpbmcoKTtcblxuICAgICAgICAgICAgLy8gY29udGludWUgb25cbiAgICAgICAgICAgIG5leHQobnVsbCwgcGF5bG9hZCk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgLy8gZGVmaW5lIGJvdGggdGhlIGV4dGVuZGVkIG1ldGhvZHMgYW5kIHRoZSBtaWRkbGV3YXJlIGluIG91ciBwbHVnaW5cbiAgICByZXR1cm4ge1xuICAgICAgICBuYW1lc3BhY2U6ICd0eXBpbmdJbmRpY2F0b3InLFxuICAgICAgICBleHRlbmRzOiB7XG4gICAgICAgICAgICBDaGF0OiBleHRlbnNpb24sXG4gICAgICAgICAgICBHbG9iYWxDaGF0OiBleHRlbnNpb25cbiAgICAgICAgfSxcbiAgICAgICAgbWlkZGxld2FyZToge1xuICAgICAgICAgICAgZW1pdFxuICAgICAgICB9XG4gICAgfVxuXG5cbn1cbiJdfQ==
