(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function() {

    const package = require('../package.json');
    window.OpenChatFramework.plugin[package.name] = require('../src/plugin.js');

})();

},{"../package.json":2,"../src/plugin.js":3}],2:[function(require,module,exports){
module.exports={
  "author": "Ian Jennings",
  "name": "chat-engine-typing-indicator",
  "version": "0.0.4",
  "main": "src/plugin.js",
  "open-chat-framework": {
    "namespace": "typing-indicator"
  },
  "dependencies": {
    "chat-engine": "^0.0.4"
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

            // will set Chat.typing.isTyping to false immediately
            this.isTyping = false;

        }
        startTyping() {

            // this is called manually by the client

            // set boolean that we're in middle of typing
            this.isTyping = true;

            // emit an event over the network that this user started typing
            this.parent.emit(['$' + 'typingIndicator', 'startTyping'].join('.'));

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
                this.parent.emit(['$' + 'typingIndicator', 'stopTyping'].join('.'));

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy5udm0vdmVyc2lvbnMvbm9kZS92Ni43LjAvbGliL25vZGVfbW9kdWxlcy9vY2YtcGx1Z2luL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIudG1wL3dyYXAuanMiLCJwYWNrYWdlLmpzb24iLCJzcmMvcGx1Z2luLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIoZnVuY3Rpb24oKSB7XG5cbiAgICBjb25zdCBwYWNrYWdlID0gcmVxdWlyZSgnLi4vcGFja2FnZS5qc29uJyk7XG4gICAgd2luZG93Lk9wZW5DaGF0RnJhbWV3b3JrLnBsdWdpbltwYWNrYWdlLm5hbWVdID0gcmVxdWlyZSgnLi4vc3JjL3BsdWdpbi5qcycpO1xuXG59KSgpO1xuIiwibW9kdWxlLmV4cG9ydHM9e1xuICBcImF1dGhvclwiOiBcIklhbiBKZW5uaW5nc1wiLFxuICBcIm5hbWVcIjogXCJjaGF0LWVuZ2luZS10eXBpbmctaW5kaWNhdG9yXCIsXG4gIFwidmVyc2lvblwiOiBcIjAuMC40XCIsXG4gIFwibWFpblwiOiBcInNyYy9wbHVnaW4uanNcIixcbiAgXCJvcGVuLWNoYXQtZnJhbWV3b3JrXCI6IHtcbiAgICBcIm5hbWVzcGFjZVwiOiBcInR5cGluZy1pbmRpY2F0b3JcIlxuICB9LFxuICBcImRlcGVuZGVuY2llc1wiOiB7XG4gICAgXCJjaGF0LWVuZ2luZVwiOiBcIl4wLjAuNFwiXG4gIH1cbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gKGNvbmZpZykgPT4ge1xuXG4gICAgLy8gc2V0IHRoZSBkZWZhdWx0IGZvciB0eXBpbmdcbiAgICAvLyBpZiB0aGUgY2xpZW50IHR5cGVzIGlucHV0LCB3ZSB3b250IGZpcmUgXCJzdG9wVHlwaW5nXCIgdW5sZXNzIHRoZSBjbGllbnRcbiAgICAvLyBkb2Vzbid0IHR5cGUgYW55dGhpbmcgZm9yIHRoaXMgdGltZW91dFxuICAgIGNvbmZpZyA9IGNvbmZpZyB8fCB7dGltZW91dDogMTAwMH07XG5cbiAgICAvLyBjcmVhdGUgYSBwbGFjZSB0byBzdG9yZSB0aGUgc2V0VGltZW91dCBpblxuICAgIGxldCBzdG9wVHlwaW5nVGltZW91dCA9IG51bGw7XG5cbiAgICAvLyBkZWZpbmUgdGhlIG1ldGhvZHMgdGhhdCB3aWxsIGJlIGF0dGFjaGVkIHRvIHRoZSBjbGFzcyBDaGF0XG4gICAgY2xhc3MgZXh0ZW5zaW9uICB7XG4gICAgICAgIGNvbnN0cnVjdCgpIHtcblxuICAgICAgICAgICAgLy8gd2lsbCBzZXQgQ2hhdC50eXBpbmcuaXNUeXBpbmcgdG8gZmFsc2UgaW1tZWRpYXRlbHlcbiAgICAgICAgICAgIHRoaXMuaXNUeXBpbmcgPSBmYWxzZTtcblxuICAgICAgICB9XG4gICAgICAgIHN0YXJ0VHlwaW5nKCkge1xuXG4gICAgICAgICAgICAvLyB0aGlzIGlzIGNhbGxlZCBtYW51YWxseSBieSB0aGUgY2xpZW50XG5cbiAgICAgICAgICAgIC8vIHNldCBib29sZWFuIHRoYXQgd2UncmUgaW4gbWlkZGxlIG9mIHR5cGluZ1xuICAgICAgICAgICAgdGhpcy5pc1R5cGluZyA9IHRydWU7XG5cbiAgICAgICAgICAgIC8vIGVtaXQgYW4gZXZlbnQgb3ZlciB0aGUgbmV0d29yayB0aGF0IHRoaXMgdXNlciBzdGFydGVkIHR5cGluZ1xuICAgICAgICAgICAgdGhpcy5wYXJlbnQuZW1pdChbJyQnICsgJ3R5cGluZ0luZGljYXRvcicsICdzdGFydFR5cGluZyddLmpvaW4oJy4nKSk7XG5cbiAgICAgICAgICAgIC8vIGtpbGwgYW55IGV4aXN0aW5nIHRpbWVvdXRzXG4gICAgICAgICAgICBjbGVhclRpbWVvdXQoc3RvcFR5cGluZ1RpbWVvdXQpO1xuXG4gICAgICAgICAgICAvLyBjcmVhdGUgYSBuZXcgdGltZW91dFxuICAgICAgICAgICAgc3RvcFR5cGluZ1RpbWVvdXQgPSBzZXRUaW1lb3V0ICgoKSA9PiB7XG5cbiAgICAgICAgICAgICAgICAvLyB0cmlnZ2VyIHN0b3AgdHlwaW5nIGFmdGVyIGEgc2V0IGFtb3VudCBvZiB0aW1lXG4gICAgICAgICAgICAgICAgdGhpcy5zdG9wVHlwaW5nKCk7XG5cbiAgICAgICAgICAgIH0sIGNvbmZpZy50aW1lb3V0KTtcblxuICAgICAgICB9XG4gICAgICAgIHN0b3BUeXBpbmcoKSB7XG5cbiAgICAgICAgICAgIC8vIHdlIG11c3QgYmUgY3VycmVudGx5IHR5cGluZyB0byBzdG9wIHR5cGluZ1xuICAgICAgICAgICAgLy8gaWYodGhpcy5pc1R5cGluZykge1xuXG4gICAgICAgICAgICAgICAgLy8gcmVtb3ZlIHRoZSB0aW1lb3V0XG4gICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHN0b3BUeXBpbmdUaW1lb3V0KTtcblxuICAgICAgICAgICAgICAgIC8vIGJyb2FkY2FzdCBhIHN0b3B0eXBpbmcgZXZlbnRcbiAgICAgICAgICAgICAgICB0aGlzLnBhcmVudC5lbWl0KFsnJCcgKyAndHlwaW5nSW5kaWNhdG9yJywgJ3N0b3BUeXBpbmcnXS5qb2luKCcuJykpO1xuXG4gICAgICAgICAgICAgICAgLy8gc3RvcCB0eXBpbmcgaW5kaWNhdG9yXG4gICAgICAgICAgICAgICAgdGhpcy5pc1R5cGluZyA9IGZhbHNlO1xuXG4gICAgICAgICAgICAvLyB9XG5cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIGRlZmluZSBlbWl0IG1pZGRsZXdhcmVcbiAgICBsZXQgZW1pdCA9IHtcbiAgICAgICAgbWVzc2FnZTogKHBheWxvYWQsIG5leHQpID0+IHtcblxuICAgICAgICAgICAgLy8gaXQncyB3b3J0aCBub3RpbmcgaGVyZSwgd2UgY2FuJ3QgYWNjZXNzIGBgYGV4dGVuc2lvbmBgYCBoZXJlXG4gICAgICAgICAgICAvLyBiZWNhdXNlIHRoaXMgZnVuY3Rpb24gcnVucyBpbiBhIGRpZmZlcmVudCBjb250ZXh0XG5cbiAgICAgICAgICAgIC8vIG9uIGV2ZXJ5IG1lc3NhZ2UsIHRlbGwgdGhlIGNoYXQgdG8gc3RvcCB0eXBpbmdcbiAgICAgICAgICAgIHBheWxvYWQuY2hhdC50eXBpbmdJbmRpY2F0b3Iuc3RvcFR5cGluZygpO1xuXG4gICAgICAgICAgICAvLyBjb250aW51ZSBvblxuICAgICAgICAgICAgbmV4dChudWxsLCBwYXlsb2FkKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICAvLyBkZWZpbmUgYm90aCB0aGUgZXh0ZW5kZWQgbWV0aG9kcyBhbmQgdGhlIG1pZGRsZXdhcmUgaW4gb3VyIHBsdWdpblxuICAgIHJldHVybiB7XG4gICAgICAgIG5hbWVzcGFjZTogJ3R5cGluZ0luZGljYXRvcicsXG4gICAgICAgIGV4dGVuZHM6IHtcbiAgICAgICAgICAgIENoYXQ6IGV4dGVuc2lvbixcbiAgICAgICAgICAgIEdsb2JhbENoYXQ6IGV4dGVuc2lvblxuICAgICAgICB9LFxuICAgICAgICBtaWRkbGV3YXJlOiB7XG4gICAgICAgICAgICBlbWl0XG4gICAgICAgIH1cbiAgICB9XG5cblxufVxuIl19
