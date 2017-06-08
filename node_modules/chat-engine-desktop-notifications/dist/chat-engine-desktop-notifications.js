(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function() {

    const package = require('../package.json');
    window.ChatEngineCore.plugin[package.name] = require('../src/plugin.js');

})();

},{"../package.json":2,"../src/plugin.js":3}],2:[function(require,module,exports){
module.exports={
  "name": "chat-engine-desktop-notifications",
  "version": "0.0.1",
  "author": "Ian Jennings",
  "main": "src/plugin.js",
  "dependencies": {
    "chat-engine": "^0.0.4"
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy5udm0vdmVyc2lvbnMvbm9kZS92Ni43LjAvbGliL25vZGVfbW9kdWxlcy9jaGF0LWVuZ2luZS1wbHVnaW4vbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsIi50bXAvd3JhcC5qcyIsInBhY2thZ2UuanNvbiIsInNyYy9wbHVnaW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIoZnVuY3Rpb24oKSB7XG5cbiAgICBjb25zdCBwYWNrYWdlID0gcmVxdWlyZSgnLi4vcGFja2FnZS5qc29uJyk7XG4gICAgd2luZG93LkNoYXRFbmdpbmVDb3JlLnBsdWdpbltwYWNrYWdlLm5hbWVdID0gcmVxdWlyZSgnLi4vc3JjL3BsdWdpbi5qcycpO1xuXG59KSgpO1xuIiwibW9kdWxlLmV4cG9ydHM9e1xuICBcIm5hbWVcIjogXCJjaGF0LWVuZ2luZS1kZXNrdG9wLW5vdGlmaWNhdGlvbnNcIixcbiAgXCJ2ZXJzaW9uXCI6IFwiMC4wLjFcIixcbiAgXCJhdXRob3JcIjogXCJJYW4gSmVubmluZ3NcIixcbiAgXCJtYWluXCI6IFwic3JjL3BsdWdpbi5qc1wiLFxuICBcImRlcGVuZGVuY2llc1wiOiB7XG4gICAgXCJjaGF0LWVuZ2luZVwiOiBcIl4wLjAuNFwiXG4gIH1cbn1cbiIsIi8vIGRlZmluZSBvdXIgcGx1Z2luIHZhbHVlcyBpbiByb290XG5jb25zdCBkZWZhdWx0cyA9IHt0aW1lb3V0OiAxMDAwfTtcblxubW9kdWxlLmV4cG9ydHMgPSAoY29uZmlnKSA9PiB7XG5cbiAgICAvLyByZXF1ZXN0IHBlcm1pc3Npb24gb24gcGFnZSBsb2FkXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmICghTm90aWZpY2F0aW9uKSB7XG4gICAgICAgIGFsZXJ0KCdEZXNrdG9wIG5vdGlmaWNhdGlvbnMgbm90IGF2YWlsYWJsZSBpbiB5b3VyIGJyb3dzZXIuIFRyeSBDaHJvbWl1bS4nKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAoTm90aWZpY2F0aW9uLnBlcm1pc3Npb24gIT09IFwiZ3JhbnRlZFwiKVxuICAgICAgICBOb3RpZmljYXRpb24ucmVxdWVzdFBlcm1pc3Npb24oKTtcbiAgICB9KTtcblxuICAgIGxldCBsYXN0Tm90aWZpY2F0aW9uID0gZmFsc2U7XG5cbiAgICBmdW5jdGlvbiBub3RpZnlNZSh0aXRsZSwgaWNvbiwgYm9keSwgY2FsbGJhY2spIHtcblxuICAgICAgaWYobGFzdE5vdGlmaWNhdGlvbikge1xuXG4gICAgICAgIGxhc3ROb3RpZmljYXRpb24uY2xvc2UoKTtcbiAgICAgICAgbGFzdE5vdGlmaWNhdGlvbiA9IGZhbHNlO1xuXG4gICAgICB9XG5cbiAgICAgIGlmIChOb3RpZmljYXRpb24ucGVybWlzc2lvbiAhPT0gXCJncmFudGVkXCIpIHtcbiAgICAgICAgTm90aWZpY2F0aW9uLnJlcXVlc3RQZXJtaXNzaW9uKCk7XG4gICAgICB9IGVsc2Uge1xuXG4gICAgICAgIGxhc3ROb3RpZmljYXRpb24gPSBuZXcgTm90aWZpY2F0aW9uKHRpdGxlIHx8ICdOb3RpZmljYXRpb24gdGl0bGUnLCB7XG4gICAgICAgICAgaWNvbjogaWNvbiB8fCAnaHR0cDovL2Nkbi5zc3RhdGljLm5ldC9zdGFja2V4Y2hhbmdlL2ltZy9sb2dvcy9zby9zby1pY29uLnBuZycsXG4gICAgICAgICAgYm9keTogYm9keSB8fCBcIkhleSB0aGVyZSEgWW91J3ZlIGJlZW4gbm90aWZpZWQhXCIsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGxhc3ROb3RpZmljYXRpb24ub25jbGljayA9IGNhbGxiYWNrO1xuXG4gICAgICB9XG5cbiAgICB9XG5cbiAgICAvLyBTZXQgdGhlIG5hbWUgb2YgdGhlIGhpZGRlbiBwcm9wZXJ0eSBhbmQgdGhlIGNoYW5nZSBldmVudCBmb3IgdmlzaWJpbGl0eVxuICAgIHZhciBoaWRkZW4sIHZpc2liaWxpdHlDaGFuZ2U7XG4gICAgaWYgKHR5cGVvZiBkb2N1bWVudC5oaWRkZW4gIT09IFwidW5kZWZpbmVkXCIpIHsgLy8gT3BlcmEgMTIuMTAgYW5kIEZpcmVmb3ggMTggYW5kIGxhdGVyIHN1cHBvcnRcbiAgICAgIGhpZGRlbiA9IFwiaGlkZGVuXCI7XG4gICAgICB2aXNpYmlsaXR5Q2hhbmdlID0gXCJ2aXNpYmlsaXR5Y2hhbmdlXCI7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgZG9jdW1lbnQubXNIaWRkZW4gIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgIGhpZGRlbiA9IFwibXNIaWRkZW5cIjtcbiAgICAgIHZpc2liaWxpdHlDaGFuZ2UgPSBcIm1zdmlzaWJpbGl0eWNoYW5nZVwiO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGRvY3VtZW50LndlYmtpdEhpZGRlbiAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgaGlkZGVuID0gXCJ3ZWJraXRIaWRkZW5cIjtcbiAgICAgIHZpc2liaWxpdHlDaGFuZ2UgPSBcIndlYmtpdHZpc2liaWxpdHljaGFuZ2VcIjtcbiAgICB9XG5cbiAgICBsZXQgZGVmYXVsdFRpdGxlID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIHJldHVybiAnTmV3IE1lc3NhZ2UgSW4gJyArIGV2ZW50LmNoYXQuY2hhbm5lbDtcbiAgICB9O1xuXG4gICAgbGV0IGRlZmF1bHRJY29uID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgIH07XG5cbiAgICBsZXQgZGVmYXVsdE1lc3NhZ2UgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KGV2ZW50LmRhdGEpO1xuICAgIH07XG5cbiAgICBsZXQgZGVmYXVsdENhbGxiYWNrID0gKGV2ZW50KSA9PiB7XG4gICAgICB3aW5kb3cuZm9jdXMoKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuXG4gICAgY29uZmlnLnRpdGxlID0gY29uZmlnLnRpdGxlIHx8IGRlZmF1bHRUaXRsZTtcbiAgICBjb25maWcuaWNvbiA9IGNvbmZpZy5pY29uIHx8IGRlZmF1bHRJY29uO1xuICAgIGNvbmZpZy5tZXNzYWdlID0gY29uZmlnLm1lc3NhZ2UgfHwgZGVmYXVsdE1lc3NhZ2U7XG4gICAgY29uZmlnLmNhbGxiYWNrID0gY29uZmlnLmNhbGxiYWNrIHx8IGRlZmF1bHRDYWxsYmFjaztcblxuICAgIGxldCBpc1Zpc2libGUgPSB0cnVlO1xuXG4gICAgZnVuY3Rpb24gaGFuZGxlVmlzaWJpbGl0eUNoYW5nZSgpIHtcbiAgICAgIGlmIChkb2N1bWVudFtoaWRkZW5dKSB7XG4gICAgICAgIGlzVmlzaWJsZSA9IGZhbHNlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaXNWaXNpYmxlID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBXYXJuIGlmIHRoZSBicm93c2VyIGRvZXNuJ3Qgc3VwcG9ydCBhZGRFdmVudExpc3RlbmVyIG9yIHRoZSBQYWdlIFZpc2liaWxpdHkgQVBJXG4gICAgaWYgKHR5cGVvZiBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyID09PSBcInVuZGVmaW5lZFwiIHx8IHR5cGVvZiBkb2N1bWVudFtoaWRkZW5dID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICBjb25zb2xlLmxvZyhcIlRoaXMgZGVtbyByZXF1aXJlcyBhIGJyb3dzZXIsIHN1Y2ggYXMgR29vZ2xlIENocm9tZSBvciBGaXJlZm94LCB0aGF0IHN1cHBvcnRzIHRoZSBQYWdlIFZpc2liaWxpdHkgQVBJLlwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gSGFuZGxlIHBhZ2UgdmlzaWJpbGl0eSBjaGFuZ2VcbiAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIodmlzaWJpbGl0eUNoYW5nZSwgaGFuZGxlVmlzaWJpbGl0eUNoYW5nZSwgZmFsc2UpO1xuICAgIH1cblxuICAgIGNsYXNzIGV4dGVuc2lvbiB7XG5cbiAgICAgICAgY29uc3RydWN0KCkge1xuXG4gICAgICAgICAgICB0aGlzLnBhcmVudC5vbignbWVzc2FnZScsIChldmVudCkgPT4ge1xuXG4gICAgICAgICAgICAgICAgaWYoIWlzVmlzaWJsZSkge1xuICAgICAgICAgICAgICAgICAgICBub3RpZnlNZShjb25maWcudGl0bGUoZXZlbnQpLCBjb25maWcuaWNvbihldmVudCksIGNvbmZpZy5tZXNzYWdlKGV2ZW50KSwgY29uZmlnLmNhbGxiYWNrKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICAvLyBhdHRhY2ggbWV0aG9kcyB0byBDaGF0XG4gICAgcmV0dXJuIHtcbiAgICAgICAgbmFtZXNwYWNlOiAnZGVza3RvcC1ub3RpZmljYXRpb25zJyxcbiAgICAgICAgZXh0ZW5kczoge1xuICAgICAgICAgICAgQ2hhdDogZXh0ZW5zaW9uXG4gICAgICAgIH1cbiAgICB9XG5cbn1cbiJdfQ==
