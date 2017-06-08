(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function() {

    const package = require('../package.json');
    window.ChatEngineCore.plugin[package.name] = require('../src/plugin.js');

})();

},{"../package.json":2,"../src/plugin.js":3}],2:[function(require,module,exports){
module.exports={
  "author": "Ian Jennings",
  "name": "chat-engine-typing-indicator",
  "version": "0.0.5",
  "main": "src/plugin.js",
  "open-chat-framework": {
    "namespace": "typing-indicator"
  },
  "dependencies": {
    "chat-engine": "0.2.x"
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy5udm0vdmVyc2lvbnMvbm9kZS92Ni43LjAvbGliL25vZGVfbW9kdWxlcy9jaGF0LWVuZ2luZS1wbHVnaW4vbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsIi50bXAvd3JhcC5qcyIsInBhY2thZ2UuanNvbiIsInNyYy9wbHVnaW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIihmdW5jdGlvbigpIHtcblxuICAgIGNvbnN0IHBhY2thZ2UgPSByZXF1aXJlKCcuLi9wYWNrYWdlLmpzb24nKTtcbiAgICB3aW5kb3cuQ2hhdEVuZ2luZUNvcmUucGx1Z2luW3BhY2thZ2UubmFtZV0gPSByZXF1aXJlKCcuLi9zcmMvcGx1Z2luLmpzJyk7XG5cbn0pKCk7XG4iLCJtb2R1bGUuZXhwb3J0cz17XG4gIFwiYXV0aG9yXCI6IFwiSWFuIEplbm5pbmdzXCIsXG4gIFwibmFtZVwiOiBcImNoYXQtZW5naW5lLXR5cGluZy1pbmRpY2F0b3JcIixcbiAgXCJ2ZXJzaW9uXCI6IFwiMC4wLjVcIixcbiAgXCJtYWluXCI6IFwic3JjL3BsdWdpbi5qc1wiLFxuICBcIm9wZW4tY2hhdC1mcmFtZXdvcmtcIjoge1xuICAgIFwibmFtZXNwYWNlXCI6IFwidHlwaW5nLWluZGljYXRvclwiXG4gIH0sXG4gIFwiZGVwZW5kZW5jaWVzXCI6IHtcbiAgICBcImNoYXQtZW5naW5lXCI6IFwiMC4yLnhcIlxuICB9XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IChjb25maWcpID0+IHtcblxuICAgIC8vIHNldCB0aGUgZGVmYXVsdCBmb3IgdHlwaW5nXG4gICAgLy8gaWYgdGhlIGNsaWVudCB0eXBlcyBpbnB1dCwgd2Ugd29udCBmaXJlIFwic3RvcFR5cGluZ1wiIHVubGVzcyB0aGUgY2xpZW50XG4gICAgLy8gZG9lc24ndCB0eXBlIGFueXRoaW5nIGZvciB0aGlzIHRpbWVvdXRcbiAgICBjb25maWcgPSBjb25maWcgfHwge3RpbWVvdXQ6IDEwMDB9O1xuXG4gICAgLy8gY3JlYXRlIGEgcGxhY2UgdG8gc3RvcmUgdGhlIHNldFRpbWVvdXQgaW5cbiAgICBsZXQgc3RvcFR5cGluZ1RpbWVvdXQgPSBudWxsO1xuXG4gICAgLy8gZGVmaW5lIHRoZSBtZXRob2RzIHRoYXQgd2lsbCBiZSBhdHRhY2hlZCB0byB0aGUgY2xhc3MgQ2hhdFxuICAgIGNsYXNzIGV4dGVuc2lvbiAge1xuICAgICAgICBjb25zdHJ1Y3QoKSB7XG5cbiAgICAgICAgICAgIC8vIHdpbGwgc2V0IENoYXQudHlwaW5nLmlzVHlwaW5nIHRvIGZhbHNlIGltbWVkaWF0ZWx5XG4gICAgICAgICAgICB0aGlzLmlzVHlwaW5nID0gZmFsc2U7XG5cbiAgICAgICAgfVxuICAgICAgICBzdGFydFR5cGluZygpIHtcblxuICAgICAgICAgICAgLy8gdGhpcyBpcyBjYWxsZWQgbWFudWFsbHkgYnkgdGhlIGNsaWVudFxuXG4gICAgICAgICAgICAvLyBzZXQgYm9vbGVhbiB0aGF0IHdlJ3JlIGluIG1pZGRsZSBvZiB0eXBpbmdcbiAgICAgICAgICAgIHRoaXMuaXNUeXBpbmcgPSB0cnVlO1xuXG4gICAgICAgICAgICAvLyBlbWl0IGFuIGV2ZW50IG92ZXIgdGhlIG5ldHdvcmsgdGhhdCB0aGlzIHVzZXIgc3RhcnRlZCB0eXBpbmdcbiAgICAgICAgICAgIHRoaXMucGFyZW50LmVtaXQoWyckJyArICd0eXBpbmdJbmRpY2F0b3InLCAnc3RhcnRUeXBpbmcnXS5qb2luKCcuJykpO1xuXG4gICAgICAgICAgICAvLyBraWxsIGFueSBleGlzdGluZyB0aW1lb3V0c1xuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHN0b3BUeXBpbmdUaW1lb3V0KTtcblxuICAgICAgICAgICAgLy8gY3JlYXRlIGEgbmV3IHRpbWVvdXRcbiAgICAgICAgICAgIHN0b3BUeXBpbmdUaW1lb3V0ID0gc2V0VGltZW91dCAoKCkgPT4ge1xuXG4gICAgICAgICAgICAgICAgLy8gdHJpZ2dlciBzdG9wIHR5cGluZyBhZnRlciBhIHNldCBhbW91bnQgb2YgdGltZVxuICAgICAgICAgICAgICAgIHRoaXMuc3RvcFR5cGluZygpO1xuXG4gICAgICAgICAgICB9LCBjb25maWcudGltZW91dCk7XG5cbiAgICAgICAgfVxuICAgICAgICBzdG9wVHlwaW5nKCkge1xuXG4gICAgICAgICAgICAvLyB3ZSBtdXN0IGJlIGN1cnJlbnRseSB0eXBpbmcgdG8gc3RvcCB0eXBpbmdcbiAgICAgICAgICAgIC8vIGlmKHRoaXMuaXNUeXBpbmcpIHtcblxuICAgICAgICAgICAgICAgIC8vIHJlbW92ZSB0aGUgdGltZW91dFxuICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dChzdG9wVHlwaW5nVGltZW91dCk7XG5cbiAgICAgICAgICAgICAgICAvLyBicm9hZGNhc3QgYSBzdG9wdHlwaW5nIGV2ZW50XG4gICAgICAgICAgICAgICAgdGhpcy5wYXJlbnQuZW1pdChbJyQnICsgJ3R5cGluZ0luZGljYXRvcicsICdzdG9wVHlwaW5nJ10uam9pbignLicpKTtcblxuICAgICAgICAgICAgICAgIC8vIHN0b3AgdHlwaW5nIGluZGljYXRvclxuICAgICAgICAgICAgICAgIHRoaXMuaXNUeXBpbmcgPSBmYWxzZTtcblxuICAgICAgICAgICAgLy8gfVxuXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBkZWZpbmUgZW1pdCBtaWRkbGV3YXJlXG4gICAgbGV0IGVtaXQgPSB7XG4gICAgICAgIG1lc3NhZ2U6IChwYXlsb2FkLCBuZXh0KSA9PiB7XG5cbiAgICAgICAgICAgIC8vIGl0J3Mgd29ydGggbm90aW5nIGhlcmUsIHdlIGNhbid0IGFjY2VzcyBgYGBleHRlbnNpb25gYGAgaGVyZVxuICAgICAgICAgICAgLy8gYmVjYXVzZSB0aGlzIGZ1bmN0aW9uIHJ1bnMgaW4gYSBkaWZmZXJlbnQgY29udGV4dFxuXG4gICAgICAgICAgICAvLyBvbiBldmVyeSBtZXNzYWdlLCB0ZWxsIHRoZSBjaGF0IHRvIHN0b3AgdHlwaW5nXG4gICAgICAgICAgICBwYXlsb2FkLmNoYXQudHlwaW5nSW5kaWNhdG9yLnN0b3BUeXBpbmcoKTtcblxuICAgICAgICAgICAgLy8gY29udGludWUgb25cbiAgICAgICAgICAgIG5leHQobnVsbCwgcGF5bG9hZCk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgLy8gZGVmaW5lIGJvdGggdGhlIGV4dGVuZGVkIG1ldGhvZHMgYW5kIHRoZSBtaWRkbGV3YXJlIGluIG91ciBwbHVnaW5cbiAgICByZXR1cm4ge1xuICAgICAgICBuYW1lc3BhY2U6ICd0eXBpbmdJbmRpY2F0b3InLFxuICAgICAgICBleHRlbmRzOiB7XG4gICAgICAgICAgICBDaGF0OiBleHRlbnNpb24sXG4gICAgICAgICAgICBHbG9iYWxDaGF0OiBleHRlbnNpb25cbiAgICAgICAgfSxcbiAgICAgICAgbWlkZGxld2FyZToge1xuICAgICAgICAgICAgZW1pdFxuICAgICAgICB9XG4gICAgfVxuXG5cbn1cbiJdfQ==
