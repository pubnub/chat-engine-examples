(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function() {

    const package = require('../package.json');
    window.OpenChatFramework.plugin[package.name] = require('../src/plugin.js');

})();

},{"../package.json":2,"../src/plugin.js":3}],2:[function(require,module,exports){
module.exports={
  "name": "ocf-desktop-notifications",
  "version": "0.0.1",
  "main": "src/plugin.js",
  "dependencies": {
    "ocf": "^0.0.4"
  }
}

},{}],3:[function(require,module,exports){
// define our plugin values in root
const defaults = {timeout: 1000};

module.exports = (config) => {

    // request permission on page load
    document.addEventListener('DOMContentLoaded', function () {
      if (!Notification) {
        alert('Desktop notifications not available in your browser. Try Chromium.');
        return;
      }

      if (Notification.permission !== "granted")
        Notification.requestPermission();
    });

    let lastNotification = false;

    function notifyMe(title, icon, body, callback) {

      if(lastNotification) {

        lastNotification.close();
        lastNotification = false;

      }

      if (Notification.permission !== "granted") {
        Notification.requestPermission();
      } else {

        lastNotification = new Notification(title || 'Notification title', {
          icon: icon || 'http://cdn.sstatic.net/stackexchange/img/logos/so/so-icon.png',
          body: body || "Hey there! You've been notified!",
        });

        lastNotification.onclick = callback;

      }

    }

    // Set the name of the hidden property and the change event for visibility
    var hidden, visibilityChange;
    if (typeof document.hidden !== "undefined") { // Opera 12.10 and Firefox 18 and later support
      hidden = "hidden";
      visibilityChange = "visibilitychange";
    } else if (typeof document.msHidden !== "undefined") {
      hidden = "msHidden";
      visibilityChange = "msvisibilitychange";
    } else if (typeof document.webkitHidden !== "undefined") {
      hidden = "webkitHidden";
      visibilityChange = "webkitvisibilitychange";
    }

    let defaultTitle = (event) => {
        return 'New Message In ' + event.chat.channel;
    };

    let defaultIcon = (event) => {
        return false
    };

    let defaultMessage = (event) => {
        return JSON.stringify(event.data);
    };

    let defaultCallback = (event) => {
      window.focus();
      return false;
    };

    config.title = config.title || defaultTitle;
    config.icon = config.icon || defaultIcon;
    config.message = config.message || defaultMessage;
    config.callback = config.callback || defaultCallback;

    let isVisible = true;

    function handleVisibilityChange() {
      if (document[hidden]) {
        isVisible = false;
      } else {
        isVisible = true;
      }
    }

    // Warn if the browser doesn't support addEventListener or the Page Visibility API
    if (typeof document.addEventListener === "undefined" || typeof document[hidden] === "undefined") {
      console.log("This demo requires a browser, such as Google Chrome or Firefox, that supports the Page Visibility API.");
    } else {
      // Handle page visibility change
      document.addEventListener(visibilityChange, handleVisibilityChange, false);
    }

    class extension {

        construct() {

            this.parent.on('message', (event) => {

                if(!isVisible) {
                    notifyMe(config.title(event), config.icon(event), config.message(event), config.callback);
                }

            });

        }

    };

    // attach methods to Chat
    return {
        namespace: 'desktop-notifications',
        extends: {
            Chat: extension
        }
    }

}

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy5udm0vdmVyc2lvbnMvbm9kZS92Ni43LjAvbGliL25vZGVfbW9kdWxlcy9vY2YtcGx1Z2luL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIudG1wL3dyYXAuanMiLCJwYWNrYWdlLmpzb24iLCJzcmMvcGx1Z2luLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIihmdW5jdGlvbigpIHtcblxuICAgIGNvbnN0IHBhY2thZ2UgPSByZXF1aXJlKCcuLi9wYWNrYWdlLmpzb24nKTtcbiAgICB3aW5kb3cuT3BlbkNoYXRGcmFtZXdvcmsucGx1Z2luW3BhY2thZ2UubmFtZV0gPSByZXF1aXJlKCcuLi9zcmMvcGx1Z2luLmpzJyk7XG5cbn0pKCk7XG4iLCJtb2R1bGUuZXhwb3J0cz17XG4gIFwibmFtZVwiOiBcIm9jZi1kZXNrdG9wLW5vdGlmaWNhdGlvbnNcIixcbiAgXCJ2ZXJzaW9uXCI6IFwiMC4wLjFcIixcbiAgXCJtYWluXCI6IFwic3JjL3BsdWdpbi5qc1wiLFxuICBcImRlcGVuZGVuY2llc1wiOiB7XG4gICAgXCJvY2ZcIjogXCJeMC4wLjRcIlxuICB9XG59XG4iLCIvLyBkZWZpbmUgb3VyIHBsdWdpbiB2YWx1ZXMgaW4gcm9vdFxuY29uc3QgZGVmYXVsdHMgPSB7dGltZW91dDogMTAwMH07XG5cbm1vZHVsZS5leHBvcnRzID0gKGNvbmZpZykgPT4ge1xuXG4gICAgLy8gcmVxdWVzdCBwZXJtaXNzaW9uIG9uIHBhZ2UgbG9hZFxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAoIU5vdGlmaWNhdGlvbikge1xuICAgICAgICBhbGVydCgnRGVza3RvcCBub3RpZmljYXRpb25zIG5vdCBhdmFpbGFibGUgaW4geW91ciBicm93c2VyLiBUcnkgQ2hyb21pdW0uJyk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKE5vdGlmaWNhdGlvbi5wZXJtaXNzaW9uICE9PSBcImdyYW50ZWRcIilcbiAgICAgICAgTm90aWZpY2F0aW9uLnJlcXVlc3RQZXJtaXNzaW9uKCk7XG4gICAgfSk7XG5cbiAgICBsZXQgbGFzdE5vdGlmaWNhdGlvbiA9IGZhbHNlO1xuXG4gICAgZnVuY3Rpb24gbm90aWZ5TWUodGl0bGUsIGljb24sIGJvZHksIGNhbGxiYWNrKSB7XG5cbiAgICAgIGlmKGxhc3ROb3RpZmljYXRpb24pIHtcblxuICAgICAgICBsYXN0Tm90aWZpY2F0aW9uLmNsb3NlKCk7XG4gICAgICAgIGxhc3ROb3RpZmljYXRpb24gPSBmYWxzZTtcblxuICAgICAgfVxuXG4gICAgICBpZiAoTm90aWZpY2F0aW9uLnBlcm1pc3Npb24gIT09IFwiZ3JhbnRlZFwiKSB7XG4gICAgICAgIE5vdGlmaWNhdGlvbi5yZXF1ZXN0UGVybWlzc2lvbigpO1xuICAgICAgfSBlbHNlIHtcblxuICAgICAgICBsYXN0Tm90aWZpY2F0aW9uID0gbmV3IE5vdGlmaWNhdGlvbih0aXRsZSB8fCAnTm90aWZpY2F0aW9uIHRpdGxlJywge1xuICAgICAgICAgIGljb246IGljb24gfHwgJ2h0dHA6Ly9jZG4uc3N0YXRpYy5uZXQvc3RhY2tleGNoYW5nZS9pbWcvbG9nb3Mvc28vc28taWNvbi5wbmcnLFxuICAgICAgICAgIGJvZHk6IGJvZHkgfHwgXCJIZXkgdGhlcmUhIFlvdSd2ZSBiZWVuIG5vdGlmaWVkIVwiLFxuICAgICAgICB9KTtcblxuICAgICAgICBsYXN0Tm90aWZpY2F0aW9uLm9uY2xpY2sgPSBjYWxsYmFjaztcblxuICAgICAgfVxuXG4gICAgfVxuXG4gICAgLy8gU2V0IHRoZSBuYW1lIG9mIHRoZSBoaWRkZW4gcHJvcGVydHkgYW5kIHRoZSBjaGFuZ2UgZXZlbnQgZm9yIHZpc2liaWxpdHlcbiAgICB2YXIgaGlkZGVuLCB2aXNpYmlsaXR5Q2hhbmdlO1xuICAgIGlmICh0eXBlb2YgZG9jdW1lbnQuaGlkZGVuICE9PSBcInVuZGVmaW5lZFwiKSB7IC8vIE9wZXJhIDEyLjEwIGFuZCBGaXJlZm94IDE4IGFuZCBsYXRlciBzdXBwb3J0XG4gICAgICBoaWRkZW4gPSBcImhpZGRlblwiO1xuICAgICAgdmlzaWJpbGl0eUNoYW5nZSA9IFwidmlzaWJpbGl0eWNoYW5nZVwiO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGRvY3VtZW50Lm1zSGlkZGVuICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICBoaWRkZW4gPSBcIm1zSGlkZGVuXCI7XG4gICAgICB2aXNpYmlsaXR5Q2hhbmdlID0gXCJtc3Zpc2liaWxpdHljaGFuZ2VcIjtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBkb2N1bWVudC53ZWJraXRIaWRkZW4gIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgIGhpZGRlbiA9IFwid2Via2l0SGlkZGVuXCI7XG4gICAgICB2aXNpYmlsaXR5Q2hhbmdlID0gXCJ3ZWJraXR2aXNpYmlsaXR5Y2hhbmdlXCI7XG4gICAgfVxuXG4gICAgbGV0IGRlZmF1bHRUaXRsZSA9IChldmVudCkgPT4ge1xuICAgICAgICByZXR1cm4gJ05ldyBNZXNzYWdlIEluICcgKyBldmVudC5jaGF0LmNoYW5uZWw7XG4gICAgfTtcblxuICAgIGxldCBkZWZhdWx0SWNvbiA9IChldmVudCkgPT4ge1xuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICB9O1xuXG4gICAgbGV0IGRlZmF1bHRNZXNzYWdlID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShldmVudC5kYXRhKTtcbiAgICB9O1xuXG4gICAgbGV0IGRlZmF1bHRDYWxsYmFjayA9IChldmVudCkgPT4ge1xuICAgICAgd2luZG93LmZvY3VzKCk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfTtcblxuICAgIGNvbmZpZy50aXRsZSA9IGNvbmZpZy50aXRsZSB8fCBkZWZhdWx0VGl0bGU7XG4gICAgY29uZmlnLmljb24gPSBjb25maWcuaWNvbiB8fCBkZWZhdWx0SWNvbjtcbiAgICBjb25maWcubWVzc2FnZSA9IGNvbmZpZy5tZXNzYWdlIHx8IGRlZmF1bHRNZXNzYWdlO1xuICAgIGNvbmZpZy5jYWxsYmFjayA9IGNvbmZpZy5jYWxsYmFjayB8fCBkZWZhdWx0Q2FsbGJhY2s7XG5cbiAgICBsZXQgaXNWaXNpYmxlID0gdHJ1ZTtcblxuICAgIGZ1bmN0aW9uIGhhbmRsZVZpc2liaWxpdHlDaGFuZ2UoKSB7XG4gICAgICBpZiAoZG9jdW1lbnRbaGlkZGVuXSkge1xuICAgICAgICBpc1Zpc2libGUgPSBmYWxzZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlzVmlzaWJsZSA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gV2FybiBpZiB0aGUgYnJvd3NlciBkb2Vzbid0IHN1cHBvcnQgYWRkRXZlbnRMaXN0ZW5lciBvciB0aGUgUGFnZSBWaXNpYmlsaXR5IEFQSVxuICAgIGlmICh0eXBlb2YgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lciA9PT0gXCJ1bmRlZmluZWRcIiB8fCB0eXBlb2YgZG9jdW1lbnRbaGlkZGVuXSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgY29uc29sZS5sb2coXCJUaGlzIGRlbW8gcmVxdWlyZXMgYSBicm93c2VyLCBzdWNoIGFzIEdvb2dsZSBDaHJvbWUgb3IgRmlyZWZveCwgdGhhdCBzdXBwb3J0cyB0aGUgUGFnZSBWaXNpYmlsaXR5IEFQSS5cIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIEhhbmRsZSBwYWdlIHZpc2liaWxpdHkgY2hhbmdlXG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKHZpc2liaWxpdHlDaGFuZ2UsIGhhbmRsZVZpc2liaWxpdHlDaGFuZ2UsIGZhbHNlKTtcbiAgICB9XG5cbiAgICBjbGFzcyBleHRlbnNpb24ge1xuXG4gICAgICAgIGNvbnN0cnVjdCgpIHtcblxuICAgICAgICAgICAgdGhpcy5wYXJlbnQub24oJ21lc3NhZ2UnLCAoZXZlbnQpID0+IHtcblxuICAgICAgICAgICAgICAgIGlmKCFpc1Zpc2libGUpIHtcbiAgICAgICAgICAgICAgICAgICAgbm90aWZ5TWUoY29uZmlnLnRpdGxlKGV2ZW50KSwgY29uZmlnLmljb24oZXZlbnQpLCBjb25maWcubWVzc2FnZShldmVudCksIGNvbmZpZy5jYWxsYmFjayk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgLy8gYXR0YWNoIG1ldGhvZHMgdG8gQ2hhdFxuICAgIHJldHVybiB7XG4gICAgICAgIG5hbWVzcGFjZTogJ2Rlc2t0b3Atbm90aWZpY2F0aW9ucycsXG4gICAgICAgIGV4dGVuZHM6IHtcbiAgICAgICAgICAgIENoYXQ6IGV4dGVuc2lvblxuICAgICAgICB9XG4gICAgfVxuXG59XG4iXX0=
