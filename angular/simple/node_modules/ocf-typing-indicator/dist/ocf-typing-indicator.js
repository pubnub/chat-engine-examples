(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function() {

    const package = require('../package.json');
    window.OpenChatFramework.plugin[package.name] = require('../src/plugin.js');

})();

},{"../package.json":2,"../src/plugin.js":3}],2:[function(require,module,exports){
module.exports={
  "name": "ocf-typing-indicator",
  "version": "0.0.1",
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
                this.parent.broadcast('$typingIndicator.startTyping', event);
            });

            this.chat.on('$typingIndicator.stopTyping', (event) => {
                this.parent.broadcast('$typingIndicator.stopTyping', event);
            });

            // will set Chat.typing.isTyping to false immediately
            this.isTyping = false;

        }
        startTyping() {

            // this is called manually by the client

            // set boolean that we're in middle of typing
            this.isTyping = true;

            // send an event over the network that this user started typing
            this.chat.send(['$' + 'typingIndicator', 'startTyping'].join('.'));

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
                this.chat.send(['$' + 'typingIndicator', 'stopTyping'].join('.'));

                // stop typing indicator
                this.isTyping = false;

            // }

        }
    }

    // define send middleware
    let send = {
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
            send
        }
    }


}

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy5udm0vdmVyc2lvbnMvbm9kZS92Ni43LjAvbGliL25vZGVfbW9kdWxlcy9vY2YtcGx1Z2luL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIudG1wL3dyYXAuanMiLCJwYWNrYWdlLmpzb24iLCJzcmMvcGx1Z2luLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiKGZ1bmN0aW9uKCkge1xuXG4gICAgY29uc3QgcGFja2FnZSA9IHJlcXVpcmUoJy4uL3BhY2thZ2UuanNvbicpO1xuICAgIHdpbmRvdy5PcGVuQ2hhdEZyYW1ld29yay5wbHVnaW5bcGFja2FnZS5uYW1lXSA9IHJlcXVpcmUoJy4uL3NyYy9wbHVnaW4uanMnKTtcblxufSkoKTtcbiIsIm1vZHVsZS5leHBvcnRzPXtcbiAgXCJuYW1lXCI6IFwib2NmLXR5cGluZy1pbmRpY2F0b3JcIixcbiAgXCJ2ZXJzaW9uXCI6IFwiMC4wLjFcIixcbiAgXCJtYWluXCI6IFwic3JjL3BsdWdpbi5qc1wiLFxuICBcIm9wZW4tY2hhdC1mcmFtZXdvcmtcIjoge1xuICAgIFwibmFtZXNwYWNlXCI6IFwidHlwaW5nLWluZGljYXRvclwiXG4gIH0sXG4gIFwiZGVwZW5kZW5jaWVzXCI6IHtcbiAgICBcIm9jZlwiOiBcIl4wLjAuNFwiXG4gIH1cbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gKGNvbmZpZykgPT4ge1xuXG4gICAgLy8gc2V0IHRoZSBkZWZhdWx0IGZvciB0eXBpbmdcbiAgICAvLyBpZiB0aGUgY2xpZW50IHR5cGVzIGlucHV0LCB3ZSB3b250IGZpcmUgXCJzdG9wVHlwaW5nXCIgdW5sZXNzIHRoZSBjbGllbnRcbiAgICAvLyBkb2Vzbid0IHR5cGUgYW55dGhpbmcgZm9yIHRoaXMgdGltZW91dFxuICAgIGNvbmZpZyA9IGNvbmZpZyB8fCB7dGltZW91dDogMTAwMH07XG5cbiAgICAvLyBjcmVhdGUgYSBwbGFjZSB0byBzdG9yZSB0aGUgc2V0VGltZW91dCBpblxuICAgIGxldCBzdG9wVHlwaW5nVGltZW91dCA9IG51bGw7XG5cbiAgICAvLyBkZWZpbmUgdGhlIG1ldGhvZHMgdGhhdCB3aWxsIGJlIGF0dGFjaGVkIHRvIHRoZSBjbGFzcyBDaGF0XG4gICAgY2xhc3MgZXh0ZW5zaW9uICB7XG4gICAgICAgIGNvbnN0cnVjdCgpIHtcblxuICAgICAgICAgICAgLy8ga2VlcCBjb21tcyBvbiBhIG5ldyBjaGFubmVsIHNvIHdlIGRvbid0IGZsb29kIGNoYXQgY2hhbm5lbFxuICAgICAgICAgICAgdGhpcy5jaGF0ID0gbmV3IHRoaXMuT0NGLkNoYXQodGhpcy5wYXJlbnQuY2hhbm5lbCArICcuJCcgKyAndHlwaW5nSW5kaWNhdG9yJyk7XG5cbiAgICAgICAgICAgIC8vIGZvcndhcmQgZXZlbnRzIHZpYSBicm9hZGNhc3RcbiAgICAgICAgICAgIHRoaXMuY2hhdC5vbignJHR5cGluZ0luZGljYXRvci5zdGFydFR5cGluZycsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMucGFyZW50LmJyb2FkY2FzdCgnJHR5cGluZ0luZGljYXRvci5zdGFydFR5cGluZycsIGV2ZW50KTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB0aGlzLmNoYXQub24oJyR0eXBpbmdJbmRpY2F0b3Iuc3RvcFR5cGluZycsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMucGFyZW50LmJyb2FkY2FzdCgnJHR5cGluZ0luZGljYXRvci5zdG9wVHlwaW5nJywgZXZlbnQpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8vIHdpbGwgc2V0IENoYXQudHlwaW5nLmlzVHlwaW5nIHRvIGZhbHNlIGltbWVkaWF0ZWx5XG4gICAgICAgICAgICB0aGlzLmlzVHlwaW5nID0gZmFsc2U7XG5cbiAgICAgICAgfVxuICAgICAgICBzdGFydFR5cGluZygpIHtcblxuICAgICAgICAgICAgLy8gdGhpcyBpcyBjYWxsZWQgbWFudWFsbHkgYnkgdGhlIGNsaWVudFxuXG4gICAgICAgICAgICAvLyBzZXQgYm9vbGVhbiB0aGF0IHdlJ3JlIGluIG1pZGRsZSBvZiB0eXBpbmdcbiAgICAgICAgICAgIHRoaXMuaXNUeXBpbmcgPSB0cnVlO1xuXG4gICAgICAgICAgICAvLyBzZW5kIGFuIGV2ZW50IG92ZXIgdGhlIG5ldHdvcmsgdGhhdCB0aGlzIHVzZXIgc3RhcnRlZCB0eXBpbmdcbiAgICAgICAgICAgIHRoaXMuY2hhdC5zZW5kKFsnJCcgKyAndHlwaW5nSW5kaWNhdG9yJywgJ3N0YXJ0VHlwaW5nJ10uam9pbignLicpKTtcblxuICAgICAgICAgICAgLy8ga2lsbCBhbnkgZXhpc3RpbmcgdGltZW91dHNcbiAgICAgICAgICAgIGNsZWFyVGltZW91dChzdG9wVHlwaW5nVGltZW91dCk7XG5cbiAgICAgICAgICAgIC8vIGNyZWF0ZSBhIG5ldyB0aW1lb3V0XG4gICAgICAgICAgICBzdG9wVHlwaW5nVGltZW91dCA9IHNldFRpbWVvdXQgKCgpID0+IHtcblxuICAgICAgICAgICAgICAgIC8vIHRyaWdnZXIgc3RvcCB0eXBpbmcgYWZ0ZXIgYSBzZXQgYW1vdW50IG9mIHRpbWVcbiAgICAgICAgICAgICAgICB0aGlzLnN0b3BUeXBpbmcoKTtcblxuICAgICAgICAgICAgfSwgY29uZmlnLnRpbWVvdXQpO1xuXG4gICAgICAgIH1cbiAgICAgICAgc3RvcFR5cGluZygpIHtcblxuICAgICAgICAgICAgLy8gd2UgbXVzdCBiZSBjdXJyZW50bHkgdHlwaW5nIHRvIHN0b3AgdHlwaW5nXG4gICAgICAgICAgICAvLyBpZih0aGlzLmlzVHlwaW5nKSB7XG5cbiAgICAgICAgICAgICAgICAvLyByZW1vdmUgdGhlIHRpbWVvdXRcbiAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQoc3RvcFR5cGluZ1RpbWVvdXQpO1xuXG4gICAgICAgICAgICAgICAgLy8gYnJvYWRjYXN0IGEgc3RvcHR5cGluZyBldmVudFxuICAgICAgICAgICAgICAgIHRoaXMuY2hhdC5zZW5kKFsnJCcgKyAndHlwaW5nSW5kaWNhdG9yJywgJ3N0b3BUeXBpbmcnXS5qb2luKCcuJykpO1xuXG4gICAgICAgICAgICAgICAgLy8gc3RvcCB0eXBpbmcgaW5kaWNhdG9yXG4gICAgICAgICAgICAgICAgdGhpcy5pc1R5cGluZyA9IGZhbHNlO1xuXG4gICAgICAgICAgICAvLyB9XG5cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIGRlZmluZSBzZW5kIG1pZGRsZXdhcmVcbiAgICBsZXQgc2VuZCA9IHtcbiAgICAgICAgbWVzc2FnZTogKHBheWxvYWQsIG5leHQpID0+IHtcblxuICAgICAgICAgICAgLy8gaXQncyB3b3J0aCBub3RpbmcgaGVyZSwgd2UgY2FuJ3QgYWNjZXNzIGBgYGV4dGVuc2lvbmBgYCBoZXJlXG4gICAgICAgICAgICAvLyBiZWNhdXNlIHRoaXMgZnVuY3Rpb24gcnVucyBpbiBhIGRpZmZlcmVudCBjb250ZXh0XG5cbiAgICAgICAgICAgIC8vIG9uIGV2ZXJ5IG1lc3NhZ2UsIHRlbGwgdGhlIGNoYXQgdG8gc3RvcCB0eXBpbmdcbiAgICAgICAgICAgIHBheWxvYWQuY2hhdC50eXBpbmdJbmRpY2F0b3Iuc3RvcFR5cGluZygpO1xuXG4gICAgICAgICAgICAvLyBjb250aW51ZSBvblxuICAgICAgICAgICAgbmV4dChudWxsLCBwYXlsb2FkKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICAvLyBkZWZpbmUgYm90aCB0aGUgZXh0ZW5kZWQgbWV0aG9kcyBhbmQgdGhlIG1pZGRsZXdhcmUgaW4gb3VyIHBsdWdpblxuICAgIHJldHVybiB7XG4gICAgICAgIG5hbWVzcGFjZTogJ3R5cGluZ0luZGljYXRvcicsXG4gICAgICAgIGV4dGVuZHM6IHtcbiAgICAgICAgICAgIENoYXQ6IGV4dGVuc2lvbixcbiAgICAgICAgICAgIEdsb2JhbENoYXQ6IGV4dGVuc2lvblxuICAgICAgICB9LFxuICAgICAgICBtaWRkbGV3YXJlOiB7XG4gICAgICAgICAgICBzZW5kXG4gICAgICAgIH1cbiAgICB9XG5cblxufVxuIl19
