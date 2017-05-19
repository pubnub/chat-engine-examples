(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function() {

    const package = require('../package.json');
    window.OpenChatFramework.plugin[package.name] = require('../src/plugin.js');

})();

},{"../package.json":2,"../src/plugin.js":3}],2:[function(require,module,exports){
module.exports={
  "name": "ocf-online-user-search",
  "version": "0.0.1",
  "main": "src/plugin.js",
  "dependencies": {
    "ocf": "^0.0.4"
  }
}

},{}],3:[function(require,module,exports){
module.exports = (config) => {

    config = config || {};
    config.field = config.field || 'username';
    config.caseSensitive = config.caseSensitive || false;

    // these are new methods that will be added to the extended class
    class extension {
      search(needle) {

          // an empty array of users we found
          var returnList = [];

          if(config.caseSensitive) {
              needle = needle.toLowerCase();
          }

          // for every user that the parent chat knows about
          for(var key in this.parent.users) {

              let haystack  = this.parent.users[key].state(this.parent);

              // see if that user username includes the input text
              if(haystack && haystack[config.field]) {

                  haystack = haystack[config.field];

                  if(!config.caseSensitive) {
                      haystack = haystack.toLowerCase();
                  }

                  if(haystack.indexOf(needle) > -1) {

                      // if it does, add it to the list of returned users
                      returnList.push(this.parent.users[key]);

                  }
              }

          }

          // return all found users
          return returnList;

      }
    }

    // add this plugin to the Chat classes
    return {
      namespace: 'onlineUserSearch',
      extends: {
          Chat: extension,
          GlobalChat: extension
      }
    }


}

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy5udm0vdmVyc2lvbnMvbm9kZS92Ni43LjAvbGliL25vZGVfbW9kdWxlcy9vY2YtcGx1Z2luL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIudG1wL3dyYXAuanMiLCJwYWNrYWdlLmpzb24iLCJzcmMvcGx1Z2luLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiKGZ1bmN0aW9uKCkge1xuXG4gICAgY29uc3QgcGFja2FnZSA9IHJlcXVpcmUoJy4uL3BhY2thZ2UuanNvbicpO1xuICAgIHdpbmRvdy5PcGVuQ2hhdEZyYW1ld29yay5wbHVnaW5bcGFja2FnZS5uYW1lXSA9IHJlcXVpcmUoJy4uL3NyYy9wbHVnaW4uanMnKTtcblxufSkoKTtcbiIsIm1vZHVsZS5leHBvcnRzPXtcbiAgXCJuYW1lXCI6IFwib2NmLW9ubGluZS11c2VyLXNlYXJjaFwiLFxuICBcInZlcnNpb25cIjogXCIwLjAuMVwiLFxuICBcIm1haW5cIjogXCJzcmMvcGx1Z2luLmpzXCIsXG4gIFwiZGVwZW5kZW5jaWVzXCI6IHtcbiAgICBcIm9jZlwiOiBcIl4wLjAuNFwiXG4gIH1cbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gKGNvbmZpZykgPT4ge1xuXG4gICAgY29uZmlnID0gY29uZmlnIHx8IHt9O1xuICAgIGNvbmZpZy5maWVsZCA9IGNvbmZpZy5maWVsZCB8fCAndXNlcm5hbWUnO1xuICAgIGNvbmZpZy5jYXNlU2Vuc2l0aXZlID0gY29uZmlnLmNhc2VTZW5zaXRpdmUgfHwgZmFsc2U7XG5cbiAgICAvLyB0aGVzZSBhcmUgbmV3IG1ldGhvZHMgdGhhdCB3aWxsIGJlIGFkZGVkIHRvIHRoZSBleHRlbmRlZCBjbGFzc1xuICAgIGNsYXNzIGV4dGVuc2lvbiB7XG4gICAgICBzZWFyY2gobmVlZGxlKSB7XG5cbiAgICAgICAgICAvLyBhbiBlbXB0eSBhcnJheSBvZiB1c2VycyB3ZSBmb3VuZFxuICAgICAgICAgIHZhciByZXR1cm5MaXN0ID0gW107XG5cbiAgICAgICAgICBpZihjb25maWcuY2FzZVNlbnNpdGl2ZSkge1xuICAgICAgICAgICAgICBuZWVkbGUgPSBuZWVkbGUudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBmb3IgZXZlcnkgdXNlciB0aGF0IHRoZSBwYXJlbnQgY2hhdCBrbm93cyBhYm91dFxuICAgICAgICAgIGZvcih2YXIga2V5IGluIHRoaXMucGFyZW50LnVzZXJzKSB7XG5cbiAgICAgICAgICAgICAgbGV0IGhheXN0YWNrICA9IHRoaXMucGFyZW50LnVzZXJzW2tleV0uc3RhdGUodGhpcy5wYXJlbnQpO1xuXG4gICAgICAgICAgICAgIC8vIHNlZSBpZiB0aGF0IHVzZXIgdXNlcm5hbWUgaW5jbHVkZXMgdGhlIGlucHV0IHRleHRcbiAgICAgICAgICAgICAgaWYoaGF5c3RhY2sgJiYgaGF5c3RhY2tbY29uZmlnLmZpZWxkXSkge1xuXG4gICAgICAgICAgICAgICAgICBoYXlzdGFjayA9IGhheXN0YWNrW2NvbmZpZy5maWVsZF07XG5cbiAgICAgICAgICAgICAgICAgIGlmKCFjb25maWcuY2FzZVNlbnNpdGl2ZSkge1xuICAgICAgICAgICAgICAgICAgICAgIGhheXN0YWNrID0gaGF5c3RhY2sudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgaWYoaGF5c3RhY2suaW5kZXhPZihuZWVkbGUpID4gLTEpIHtcblxuICAgICAgICAgICAgICAgICAgICAgIC8vIGlmIGl0IGRvZXMsIGFkZCBpdCB0byB0aGUgbGlzdCBvZiByZXR1cm5lZCB1c2Vyc1xuICAgICAgICAgICAgICAgICAgICAgIHJldHVybkxpc3QucHVzaCh0aGlzLnBhcmVudC51c2Vyc1trZXldKTtcblxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyByZXR1cm4gYWxsIGZvdW5kIHVzZXJzXG4gICAgICAgICAgcmV0dXJuIHJldHVybkxpc3Q7XG5cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBhZGQgdGhpcyBwbHVnaW4gdG8gdGhlIENoYXQgY2xhc3Nlc1xuICAgIHJldHVybiB7XG4gICAgICBuYW1lc3BhY2U6ICdvbmxpbmVVc2VyU2VhcmNoJyxcbiAgICAgIGV4dGVuZHM6IHtcbiAgICAgICAgICBDaGF0OiBleHRlbnNpb24sXG4gICAgICAgICAgR2xvYmFsQ2hhdDogZXh0ZW5zaW9uXG4gICAgICB9XG4gICAgfVxuXG5cbn1cbiJdfQ==
