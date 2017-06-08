(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function() {

    const package = require('../package.json');
    window.ChatEngineCore.plugin[package.name] = require('../src/plugin.js');

})();

},{"../package.json":3,"../src/plugin.js":4}],2:[function(require,module,exports){
//
// Dotty makes it easy to programmatically access arbitrarily nested objects and
// their properties.
//

//
// `object` is an object, `path` is the path to the property you want to check
// for existence of.
//
// `path` can be provided as either a `"string.separated.with.dots"` or as
// `["an", "array"]`.
//
// Returns `true` if the path can be completely resolved, `false` otherwise.
//

var exists = module.exports.exists = function exists(object, path) {
  if (typeof path === "string") {
    path = path.split(".");
  }

  if (!(path instanceof Array) || path.length === 0) {
    return false;
  }

  path = path.slice();

  var key = path.shift();

  if (typeof object !== "object" || object === null) {
    return false;
  }

  if (path.length === 0) {
    return Object.hasOwnProperty.apply(object, [key]);
  } else {
    return exists(object[key], path);
  }
};

//
// These arguments are the same as those for `exists`.
//
// The return value, however, is the property you're trying to access, or
// `undefined` if it can't be found. This means you won't be able to tell
// the difference between an unresolved path and an undefined property, so you 
// should not use `get` to check for the existence of a property. Use `exists`
// instead.
//

var get = module.exports.get = function get(object, path) {
  if (typeof path === "string") {
    path = path.split(".");
  }

  if (!(path instanceof Array) || path.length === 0) {
    return;
  }

  path = path.slice();

  var key = path.shift();

  if (typeof object !== "object" || object === null) {
    return;
  }

  if (path.length === 0) {
    return object[key];
  }

  if (path.length) {
    return get(object[key], path);
  }
};

//
// Arguments are similar to `exists` and `get`, with the exception that path
// components are regexes with some special cases. If a path component is `"*"`
// on its own, it'll be converted to `/.*/`.
//
// The return value is an array of values where the key path matches the
// specified criterion. If none match, an empty array will be returned.
//

var search = module.exports.search = function search(object, path) {
  if (typeof path === "string") {
    path = path.split(".");
  }

  if (!(path instanceof Array) || path.length === 0) {
    return;
  }

  path = path.slice();

  var key = path.shift();

  if (typeof object !== "object" || object === null) {
    return;
  }

  if (key === "*") {
    key = ".*";
  }

  if (typeof key === "string") {
    key = new RegExp(key);
  }

  if (path.length === 0) {
    return Object.keys(object).filter(key.test.bind(key)).map(function(k) { return object[k]; });
  } else {
    return Array.prototype.concat.apply([], Object.keys(object).filter(key.test.bind(key)).map(function(k) { return search(object[k], path); }));
  }
};

//
// The first two arguments for `put` are the same as `exists` and `get`.
//
// The third argument is a value to `put` at the `path` of the `object`.
// Objects in the middle will be created if they don't exist, or added to if
// they do. If a value is encountered in the middle of the path that is *not*
// an object, it will not be overwritten.
//
// The return value is `true` in the case that the value was `put`
// successfully, or `false` otherwise.
//

var put = module.exports.put = function put(object, path, value) {
  if (typeof path === "string") {
    path = path.split(".");
  }

  if (!(path instanceof Array) || path.length === 0) {
    return false;
  }
  
  path = path.slice();

  var key = path.shift();

  if (typeof object !== "object" || object === null) {
    return false;
  }

  if (path.length === 0) {
    object[key] = value;
  } else {
    if (typeof object[key] === "undefined") {
      object[key] = {};
    }

    if (typeof object[key] !== "object" || object[key] === null) {
      return false;
    }

    return put(object[key], path, value);
  }
};

//
// `remove` is like `put` in reverse!
//
// The return value is `true` in the case that the value existed and was removed
// successfully, or `false` otherwise.
//

var remove = module.exports.remove = function remove(object, path, value) {
  if (typeof path === "string") {
    path = path.split(".");
  }

  if (!(path instanceof Array) || path.length === 0) {
    return false;
  }
  
  path = path.slice();

  var key = path.shift();

  if (typeof object !== "object" || object === null) {
    return false;
  }

  if (path.length === 0) {
    if (!Object.hasOwnProperty.call(object, key)) {
      return false;
    }

    delete object[key];

    return true;
  } else {
    return remove(object[key], path, value);
  }
};

//
// `deepKeys` creates a list of all possible key paths for a given object.
//
// The return value is always an array, the members of which are paths in array
// format. If you want them in dot-notation format, do something like this:
//
// ```js
// dotty.deepKeys(obj).map(function(e) {
//   return e.join(".");
// });
// ```
//
// *Note: this will probably explode on recursive objects. Be careful.*
//

var deepKeys = module.exports.deepKeys = function deepKeys(object, prefix) {
  if (typeof prefix === "undefined") {
    prefix = [];
  }

  var keys = [];

  for (var k in object) {
    if (!Object.hasOwnProperty.call(object, k)) {
      continue;
    }

    keys.push(prefix.concat([k]));

    if (typeof object[k] === "object" && object[k] !== null) {
      keys = keys.concat(deepKeys(object[k], prefix.concat([k])));
    }
  }

  return keys;
};

},{}],3:[function(require,module,exports){
module.exports={
  "author": "Ian Jennings",
  "name": "chat-engine-online-user-search",
  "version": "0.0.5",
  "main": "src/plugin.js",
  "dependencies": {
    "dotty": "0.0.2",
    "chat-engine": "0.2.x"
  }
}

},{}],4:[function(require,module,exports){
const dotty = require('dotty');

module.exports = (config) => {

    config = config || {};
    config.prop = config.prop || 'username';
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
              let target = dotty.get(haystack, config.prop);

              // see if that user username includes the input text
              if(haystack && target) {

                  if(!config.caseSensitive) {
                      target = target.toLowerCase();
                  }

                  if(target.indexOf(needle) > -1) {

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

},{"dotty":2}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy5udm0vdmVyc2lvbnMvbm9kZS92Ni43LjAvbGliL25vZGVfbW9kdWxlcy9jaGF0LWVuZ2luZS1wbHVnaW4vbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsIi50bXAvd3JhcC5qcyIsIm5vZGVfbW9kdWxlcy9kb3R0eS9saWIvaW5kZXguanMiLCJwYWNrYWdlLmpzb24iLCJzcmMvcGx1Z2luLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIoZnVuY3Rpb24oKSB7XG5cbiAgICBjb25zdCBwYWNrYWdlID0gcmVxdWlyZSgnLi4vcGFja2FnZS5qc29uJyk7XG4gICAgd2luZG93LkNoYXRFbmdpbmVDb3JlLnBsdWdpbltwYWNrYWdlLm5hbWVdID0gcmVxdWlyZSgnLi4vc3JjL3BsdWdpbi5qcycpO1xuXG59KSgpO1xuIiwiLy9cbi8vIERvdHR5IG1ha2VzIGl0IGVhc3kgdG8gcHJvZ3JhbW1hdGljYWxseSBhY2Nlc3MgYXJiaXRyYXJpbHkgbmVzdGVkIG9iamVjdHMgYW5kXG4vLyB0aGVpciBwcm9wZXJ0aWVzLlxuLy9cblxuLy9cbi8vIGBvYmplY3RgIGlzIGFuIG9iamVjdCwgYHBhdGhgIGlzIHRoZSBwYXRoIHRvIHRoZSBwcm9wZXJ0eSB5b3Ugd2FudCB0byBjaGVja1xuLy8gZm9yIGV4aXN0ZW5jZSBvZi5cbi8vXG4vLyBgcGF0aGAgY2FuIGJlIHByb3ZpZGVkIGFzIGVpdGhlciBhIGBcInN0cmluZy5zZXBhcmF0ZWQud2l0aC5kb3RzXCJgIG9yIGFzXG4vLyBgW1wiYW5cIiwgXCJhcnJheVwiXWAuXG4vL1xuLy8gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIHBhdGggY2FuIGJlIGNvbXBsZXRlbHkgcmVzb2x2ZWQsIGBmYWxzZWAgb3RoZXJ3aXNlLlxuLy9cblxudmFyIGV4aXN0cyA9IG1vZHVsZS5leHBvcnRzLmV4aXN0cyA9IGZ1bmN0aW9uIGV4aXN0cyhvYmplY3QsIHBhdGgpIHtcbiAgaWYgKHR5cGVvZiBwYXRoID09PSBcInN0cmluZ1wiKSB7XG4gICAgcGF0aCA9IHBhdGguc3BsaXQoXCIuXCIpO1xuICB9XG5cbiAgaWYgKCEocGF0aCBpbnN0YW5jZW9mIEFycmF5KSB8fCBwYXRoLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHBhdGggPSBwYXRoLnNsaWNlKCk7XG5cbiAgdmFyIGtleSA9IHBhdGguc2hpZnQoKTtcblxuICBpZiAodHlwZW9mIG9iamVjdCAhPT0gXCJvYmplY3RcIiB8fCBvYmplY3QgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpZiAocGF0aC5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gT2JqZWN0Lmhhc093blByb3BlcnR5LmFwcGx5KG9iamVjdCwgW2tleV0pO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBleGlzdHMob2JqZWN0W2tleV0sIHBhdGgpO1xuICB9XG59O1xuXG4vL1xuLy8gVGhlc2UgYXJndW1lbnRzIGFyZSB0aGUgc2FtZSBhcyB0aG9zZSBmb3IgYGV4aXN0c2AuXG4vL1xuLy8gVGhlIHJldHVybiB2YWx1ZSwgaG93ZXZlciwgaXMgdGhlIHByb3BlcnR5IHlvdSdyZSB0cnlpbmcgdG8gYWNjZXNzLCBvclxuLy8gYHVuZGVmaW5lZGAgaWYgaXQgY2FuJ3QgYmUgZm91bmQuIFRoaXMgbWVhbnMgeW91IHdvbid0IGJlIGFibGUgdG8gdGVsbFxuLy8gdGhlIGRpZmZlcmVuY2UgYmV0d2VlbiBhbiB1bnJlc29sdmVkIHBhdGggYW5kIGFuIHVuZGVmaW5lZCBwcm9wZXJ0eSwgc28geW91IFxuLy8gc2hvdWxkIG5vdCB1c2UgYGdldGAgdG8gY2hlY2sgZm9yIHRoZSBleGlzdGVuY2Ugb2YgYSBwcm9wZXJ0eS4gVXNlIGBleGlzdHNgXG4vLyBpbnN0ZWFkLlxuLy9cblxudmFyIGdldCA9IG1vZHVsZS5leHBvcnRzLmdldCA9IGZ1bmN0aW9uIGdldChvYmplY3QsIHBhdGgpIHtcbiAgaWYgKHR5cGVvZiBwYXRoID09PSBcInN0cmluZ1wiKSB7XG4gICAgcGF0aCA9IHBhdGguc3BsaXQoXCIuXCIpO1xuICB9XG5cbiAgaWYgKCEocGF0aCBpbnN0YW5jZW9mIEFycmF5KSB8fCBwYXRoLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHBhdGggPSBwYXRoLnNsaWNlKCk7XG5cbiAgdmFyIGtleSA9IHBhdGguc2hpZnQoKTtcblxuICBpZiAodHlwZW9mIG9iamVjdCAhPT0gXCJvYmplY3RcIiB8fCBvYmplY3QgPT09IG51bGwpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBpZiAocGF0aC5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gb2JqZWN0W2tleV07XG4gIH1cblxuICBpZiAocGF0aC5sZW5ndGgpIHtcbiAgICByZXR1cm4gZ2V0KG9iamVjdFtrZXldLCBwYXRoKTtcbiAgfVxufTtcblxuLy9cbi8vIEFyZ3VtZW50cyBhcmUgc2ltaWxhciB0byBgZXhpc3RzYCBhbmQgYGdldGAsIHdpdGggdGhlIGV4Y2VwdGlvbiB0aGF0IHBhdGhcbi8vIGNvbXBvbmVudHMgYXJlIHJlZ2V4ZXMgd2l0aCBzb21lIHNwZWNpYWwgY2FzZXMuIElmIGEgcGF0aCBjb21wb25lbnQgaXMgYFwiKlwiYFxuLy8gb24gaXRzIG93biwgaXQnbGwgYmUgY29udmVydGVkIHRvIGAvLiovYC5cbi8vXG4vLyBUaGUgcmV0dXJuIHZhbHVlIGlzIGFuIGFycmF5IG9mIHZhbHVlcyB3aGVyZSB0aGUga2V5IHBhdGggbWF0Y2hlcyB0aGVcbi8vIHNwZWNpZmllZCBjcml0ZXJpb24uIElmIG5vbmUgbWF0Y2gsIGFuIGVtcHR5IGFycmF5IHdpbGwgYmUgcmV0dXJuZWQuXG4vL1xuXG52YXIgc2VhcmNoID0gbW9kdWxlLmV4cG9ydHMuc2VhcmNoID0gZnVuY3Rpb24gc2VhcmNoKG9iamVjdCwgcGF0aCkge1xuICBpZiAodHlwZW9mIHBhdGggPT09IFwic3RyaW5nXCIpIHtcbiAgICBwYXRoID0gcGF0aC5zcGxpdChcIi5cIik7XG4gIH1cblxuICBpZiAoIShwYXRoIGluc3RhbmNlb2YgQXJyYXkpIHx8IHBhdGgubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgcGF0aCA9IHBhdGguc2xpY2UoKTtcblxuICB2YXIga2V5ID0gcGF0aC5zaGlmdCgpO1xuXG4gIGlmICh0eXBlb2Ygb2JqZWN0ICE9PSBcIm9iamVjdFwiIHx8IG9iamVjdCA9PT0gbnVsbCkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmIChrZXkgPT09IFwiKlwiKSB7XG4gICAga2V5ID0gXCIuKlwiO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBrZXkgPT09IFwic3RyaW5nXCIpIHtcbiAgICBrZXkgPSBuZXcgUmVnRXhwKGtleSk7XG4gIH1cblxuICBpZiAocGF0aC5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gT2JqZWN0LmtleXMob2JqZWN0KS5maWx0ZXIoa2V5LnRlc3QuYmluZChrZXkpKS5tYXAoZnVuY3Rpb24oaykgeyByZXR1cm4gb2JqZWN0W2tdOyB9KTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gQXJyYXkucHJvdG90eXBlLmNvbmNhdC5hcHBseShbXSwgT2JqZWN0LmtleXMob2JqZWN0KS5maWx0ZXIoa2V5LnRlc3QuYmluZChrZXkpKS5tYXAoZnVuY3Rpb24oaykgeyByZXR1cm4gc2VhcmNoKG9iamVjdFtrXSwgcGF0aCk7IH0pKTtcbiAgfVxufTtcblxuLy9cbi8vIFRoZSBmaXJzdCB0d28gYXJndW1lbnRzIGZvciBgcHV0YCBhcmUgdGhlIHNhbWUgYXMgYGV4aXN0c2AgYW5kIGBnZXRgLlxuLy9cbi8vIFRoZSB0aGlyZCBhcmd1bWVudCBpcyBhIHZhbHVlIHRvIGBwdXRgIGF0IHRoZSBgcGF0aGAgb2YgdGhlIGBvYmplY3RgLlxuLy8gT2JqZWN0cyBpbiB0aGUgbWlkZGxlIHdpbGwgYmUgY3JlYXRlZCBpZiB0aGV5IGRvbid0IGV4aXN0LCBvciBhZGRlZCB0byBpZlxuLy8gdGhleSBkby4gSWYgYSB2YWx1ZSBpcyBlbmNvdW50ZXJlZCBpbiB0aGUgbWlkZGxlIG9mIHRoZSBwYXRoIHRoYXQgaXMgKm5vdCpcbi8vIGFuIG9iamVjdCwgaXQgd2lsbCBub3QgYmUgb3ZlcndyaXR0ZW4uXG4vL1xuLy8gVGhlIHJldHVybiB2YWx1ZSBpcyBgdHJ1ZWAgaW4gdGhlIGNhc2UgdGhhdCB0aGUgdmFsdWUgd2FzIGBwdXRgXG4vLyBzdWNjZXNzZnVsbHksIG9yIGBmYWxzZWAgb3RoZXJ3aXNlLlxuLy9cblxudmFyIHB1dCA9IG1vZHVsZS5leHBvcnRzLnB1dCA9IGZ1bmN0aW9uIHB1dChvYmplY3QsIHBhdGgsIHZhbHVlKSB7XG4gIGlmICh0eXBlb2YgcGF0aCA9PT0gXCJzdHJpbmdcIikge1xuICAgIHBhdGggPSBwYXRoLnNwbGl0KFwiLlwiKTtcbiAgfVxuXG4gIGlmICghKHBhdGggaW5zdGFuY2VvZiBBcnJheSkgfHwgcGF0aC5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgXG4gIHBhdGggPSBwYXRoLnNsaWNlKCk7XG5cbiAgdmFyIGtleSA9IHBhdGguc2hpZnQoKTtcblxuICBpZiAodHlwZW9mIG9iamVjdCAhPT0gXCJvYmplY3RcIiB8fCBvYmplY3QgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpZiAocGF0aC5sZW5ndGggPT09IDApIHtcbiAgICBvYmplY3Rba2V5XSA9IHZhbHVlO1xuICB9IGVsc2Uge1xuICAgIGlmICh0eXBlb2Ygb2JqZWN0W2tleV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgIG9iamVjdFtrZXldID0ge307XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBvYmplY3Rba2V5XSAhPT0gXCJvYmplY3RcIiB8fCBvYmplY3Rba2V5XSA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiBwdXQob2JqZWN0W2tleV0sIHBhdGgsIHZhbHVlKTtcbiAgfVxufTtcblxuLy9cbi8vIGByZW1vdmVgIGlzIGxpa2UgYHB1dGAgaW4gcmV2ZXJzZSFcbi8vXG4vLyBUaGUgcmV0dXJuIHZhbHVlIGlzIGB0cnVlYCBpbiB0aGUgY2FzZSB0aGF0IHRoZSB2YWx1ZSBleGlzdGVkIGFuZCB3YXMgcmVtb3ZlZFxuLy8gc3VjY2Vzc2Z1bGx5LCBvciBgZmFsc2VgIG90aGVyd2lzZS5cbi8vXG5cbnZhciByZW1vdmUgPSBtb2R1bGUuZXhwb3J0cy5yZW1vdmUgPSBmdW5jdGlvbiByZW1vdmUob2JqZWN0LCBwYXRoLCB2YWx1ZSkge1xuICBpZiAodHlwZW9mIHBhdGggPT09IFwic3RyaW5nXCIpIHtcbiAgICBwYXRoID0gcGF0aC5zcGxpdChcIi5cIik7XG4gIH1cblxuICBpZiAoIShwYXRoIGluc3RhbmNlb2YgQXJyYXkpIHx8IHBhdGgubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIFxuICBwYXRoID0gcGF0aC5zbGljZSgpO1xuXG4gIHZhciBrZXkgPSBwYXRoLnNoaWZ0KCk7XG5cbiAgaWYgKHR5cGVvZiBvYmplY3QgIT09IFwib2JqZWN0XCIgfHwgb2JqZWN0ID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaWYgKHBhdGgubGVuZ3RoID09PSAwKSB7XG4gICAgaWYgKCFPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIGtleSkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBkZWxldGUgb2JqZWN0W2tleV07XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gcmVtb3ZlKG9iamVjdFtrZXldLCBwYXRoLCB2YWx1ZSk7XG4gIH1cbn07XG5cbi8vXG4vLyBgZGVlcEtleXNgIGNyZWF0ZXMgYSBsaXN0IG9mIGFsbCBwb3NzaWJsZSBrZXkgcGF0aHMgZm9yIGEgZ2l2ZW4gb2JqZWN0LlxuLy9cbi8vIFRoZSByZXR1cm4gdmFsdWUgaXMgYWx3YXlzIGFuIGFycmF5LCB0aGUgbWVtYmVycyBvZiB3aGljaCBhcmUgcGF0aHMgaW4gYXJyYXlcbi8vIGZvcm1hdC4gSWYgeW91IHdhbnQgdGhlbSBpbiBkb3Qtbm90YXRpb24gZm9ybWF0LCBkbyBzb21ldGhpbmcgbGlrZSB0aGlzOlxuLy9cbi8vIGBgYGpzXG4vLyBkb3R0eS5kZWVwS2V5cyhvYmopLm1hcChmdW5jdGlvbihlKSB7XG4vLyAgIHJldHVybiBlLmpvaW4oXCIuXCIpO1xuLy8gfSk7XG4vLyBgYGBcbi8vXG4vLyAqTm90ZTogdGhpcyB3aWxsIHByb2JhYmx5IGV4cGxvZGUgb24gcmVjdXJzaXZlIG9iamVjdHMuIEJlIGNhcmVmdWwuKlxuLy9cblxudmFyIGRlZXBLZXlzID0gbW9kdWxlLmV4cG9ydHMuZGVlcEtleXMgPSBmdW5jdGlvbiBkZWVwS2V5cyhvYmplY3QsIHByZWZpeCkge1xuICBpZiAodHlwZW9mIHByZWZpeCA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHByZWZpeCA9IFtdO1xuICB9XG5cbiAgdmFyIGtleXMgPSBbXTtcblxuICBmb3IgKHZhciBrIGluIG9iamVjdCkge1xuICAgIGlmICghT2JqZWN0Lmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBrKSkge1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAga2V5cy5wdXNoKHByZWZpeC5jb25jYXQoW2tdKSk7XG5cbiAgICBpZiAodHlwZW9mIG9iamVjdFtrXSA9PT0gXCJvYmplY3RcIiAmJiBvYmplY3Rba10gIT09IG51bGwpIHtcbiAgICAgIGtleXMgPSBrZXlzLmNvbmNhdChkZWVwS2V5cyhvYmplY3Rba10sIHByZWZpeC5jb25jYXQoW2tdKSkpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBrZXlzO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzPXtcbiAgXCJhdXRob3JcIjogXCJJYW4gSmVubmluZ3NcIixcbiAgXCJuYW1lXCI6IFwiY2hhdC1lbmdpbmUtb25saW5lLXVzZXItc2VhcmNoXCIsXG4gIFwidmVyc2lvblwiOiBcIjAuMC41XCIsXG4gIFwibWFpblwiOiBcInNyYy9wbHVnaW4uanNcIixcbiAgXCJkZXBlbmRlbmNpZXNcIjoge1xuICAgIFwiZG90dHlcIjogXCIwLjAuMlwiLFxuICAgIFwiY2hhdC1lbmdpbmVcIjogXCIwLjIueFwiXG4gIH1cbn1cbiIsImNvbnN0IGRvdHR5ID0gcmVxdWlyZSgnZG90dHknKTtcblxubW9kdWxlLmV4cG9ydHMgPSAoY29uZmlnKSA9PiB7XG5cbiAgICBjb25maWcgPSBjb25maWcgfHwge307XG4gICAgY29uZmlnLnByb3AgPSBjb25maWcucHJvcCB8fCAndXNlcm5hbWUnO1xuICAgIGNvbmZpZy5jYXNlU2Vuc2l0aXZlID0gY29uZmlnLmNhc2VTZW5zaXRpdmUgfHwgZmFsc2U7XG5cbiAgICAvLyB0aGVzZSBhcmUgbmV3IG1ldGhvZHMgdGhhdCB3aWxsIGJlIGFkZGVkIHRvIHRoZSBleHRlbmRlZCBjbGFzc1xuICAgIGNsYXNzIGV4dGVuc2lvbiB7XG4gICAgICBzZWFyY2gobmVlZGxlKSB7XG5cbiAgICAgICAgICAvLyBhbiBlbXB0eSBhcnJheSBvZiB1c2VycyB3ZSBmb3VuZFxuICAgICAgICAgIHZhciByZXR1cm5MaXN0ID0gW107XG5cbiAgICAgICAgICBpZihjb25maWcuY2FzZVNlbnNpdGl2ZSkge1xuICAgICAgICAgICAgICBuZWVkbGUgPSBuZWVkbGUudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBmb3IgZXZlcnkgdXNlciB0aGF0IHRoZSBwYXJlbnQgY2hhdCBrbm93cyBhYm91dFxuICAgICAgICAgIGZvcih2YXIga2V5IGluIHRoaXMucGFyZW50LnVzZXJzKSB7XG5cbiAgICAgICAgICAgICAgbGV0IGhheXN0YWNrICA9IHRoaXMucGFyZW50LnVzZXJzW2tleV0uc3RhdGUodGhpcy5wYXJlbnQpO1xuICAgICAgICAgICAgICBsZXQgdGFyZ2V0ID0gZG90dHkuZ2V0KGhheXN0YWNrLCBjb25maWcucHJvcCk7XG5cbiAgICAgICAgICAgICAgLy8gc2VlIGlmIHRoYXQgdXNlciB1c2VybmFtZSBpbmNsdWRlcyB0aGUgaW5wdXQgdGV4dFxuICAgICAgICAgICAgICBpZihoYXlzdGFjayAmJiB0YXJnZXQpIHtcblxuICAgICAgICAgICAgICAgICAgaWYoIWNvbmZpZy5jYXNlU2Vuc2l0aXZlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0ID0gdGFyZ2V0LnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgIGlmKHRhcmdldC5pbmRleE9mKG5lZWRsZSkgPiAtMSkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgLy8gaWYgaXQgZG9lcywgYWRkIGl0IHRvIHRoZSBsaXN0IG9mIHJldHVybmVkIHVzZXJzXG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuTGlzdC5wdXNoKHRoaXMucGFyZW50LnVzZXJzW2tleV0pO1xuXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIHJldHVybiBhbGwgZm91bmQgdXNlcnNcbiAgICAgICAgICByZXR1cm4gcmV0dXJuTGlzdDtcblxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIGFkZCB0aGlzIHBsdWdpbiB0byB0aGUgQ2hhdCBjbGFzc2VzXG4gICAgcmV0dXJuIHtcbiAgICAgIG5hbWVzcGFjZTogJ29ubGluZVVzZXJTZWFyY2gnLFxuICAgICAgZXh0ZW5kczoge1xuICAgICAgICAgIENoYXQ6IGV4dGVuc2lvbixcbiAgICAgICAgICBHbG9iYWxDaGF0OiBleHRlbnNpb25cbiAgICAgIH1cbiAgICB9XG5cblxufVxuIl19
