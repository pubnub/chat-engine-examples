(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function() {

    const package = require('../package.json');
    window.ChatEngineCore.plugin[package.name] = require('../src/plugin.js');

})();

},{"../package.json":4,"../src/plugin.js":5}],2:[function(require,module,exports){
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
function e(e){return e.replace(RegExp("^"+(e.match(/^(\t| )+/)||"")[0],"gm"),"")}function n(e){return(e+"").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function r(a){function c(e){var n=t[e.replace(/\*/g,"_")[1]||""],r=i[i.length-1]==e;return n?n[1]?(i[r?"pop":"push"](e),n[0|r]):n[0]:e}function o(){for(var e="";i.length;)e+=c(i[i.length-1]);return e}var l,g,s,p,u,m=/((?:^|\n+)(?:\n---+|\* \*(?: \*)+)\n)|(?:^```(\w*)\n([\s\S]*?)\n```$)|((?:(?:^|\n+)(?:\t|  {2,}).+)+\n*)|((?:(?:^|\n)([>*+-]|\d+\.)\s+.*)+)|(?:\!\[([^\]]*?)\]\(([^\)]+?)\))|(\[)|(\](?:\(([^\)]+?)\))?)|(?:(?:^|\n+)([^\s].*)\n(\-{3,}|={3,})(?:\n+|$))|(?:(?:^|\n+)(#{1,3})\s*(.+)(?:\n+|$))|(?:`([^`].*?)`)|(  \n\n*|\n{2,}|__|\*\*|[_*])/gm,i=[],h="",f=0,$={};for(a=a.replace(/^\[(.+?)\]:\s*(.+)$/gm,function(e,n,r){return $[n.toLowerCase()]=r,""}).replace(/^\n+|\n+$/g,"");s=m.exec(a);)g=a.substring(f,s.index),f=m.lastIndex,l=s[0],g.match(/[^\\](\\\\)*\\$/)||(s[3]||s[4]?l='<pre class="code '+(s[4]?"poetry":s[2].toLowerCase())+'">'+e(n(s[3]||s[4]).replace(/^\n+|\n+$/g,""))+"</pre>":s[6]?(u=s[6],u.match(/\./)&&(s[5]=s[5].replace(/^\d+/gm,"")),p=r(e(s[5].replace(/^\s*[>*+.-]/gm,""))),">"===u?u="blockquote":(u=u.match(/\./)?"ol":"ul",p=p.replace(/^(.*)(\n|$)/gm,"<li>$1</li>")),l="<"+u+">"+p+"</"+u+">"):s[8]?l='<img src="'+n(s[8])+'" alt="'+n(s[7])+'">':s[10]?(h=h.replace("<a>",'<a href="'+n(s[11]||$[g.toLowerCase()])+'">'),l=o()+"</a>"):s[9]?l="<a>":s[12]||s[14]?(u="h"+(s[14]?s[14].length:"="===s[13][0]?1:2),l="<"+u+">"+r(s[12]||s[15])+"</"+u+">"):s[16]?l="<code>"+n(s[16])+"</code>":(s[17]||s[1])&&(l=c(s[17]||"--"))),h+=g,h+=l;return(h+a.substring(f)+o()).trim()}var t={"":["<em>","</em>"],_:["<strong>","</strong>"],"\n":["<br />"]," ":["<br />"],"-":["<hr />"]};module.exports=r;

},{}],4:[function(require,module,exports){
module.exports={
  "name": "chat-engine-markdown",
  "author": "Ian Jennings",
  "version": "0.0.5",
  "main": "src/plugin.js",
  "dependencies": {
    "dotty": "0.0.2",
    "chat-engine": "0.2.x",
    "snarkdown": "^1.2.2"
  },
  "devDependencies": {
    "chai": "^3.5.0",
    "mocha": "^3.3.0"
  }
}

},{}],5:[function(require,module,exports){
const snarkdown = require('snarkdown');
const dotty = require("dotty");

module.exports = (config = {}) => {

    config.prop = config.prop || 'data.text';

    let parseMarkdown = function(payload, next) {

        let text = dotty.get(payload, config.prop);

        if(text) {
            dotty.put(payload, config.prop, snarkdown(text));
        }

        // continue along middleware
        next(null, payload);

    };

    // define both the extended methods and the middleware in our plugin
    return {
        namespace: 'markdown',
        middleware: {
            on: {
                'message': parseMarkdown,
                '$history.message': parseMarkdown
            }
        },
    }

}

},{"dotty":2,"snarkdown":3}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy5udm0vdmVyc2lvbnMvbm9kZS92Ni43LjAvbGliL25vZGVfbW9kdWxlcy9jaGF0LWVuZ2luZS1wbHVnaW4vbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsIi50bXAvd3JhcC5qcyIsIm5vZGVfbW9kdWxlcy9kb3R0eS9saWIvaW5kZXguanMiLCJub2RlX21vZHVsZXMvc25hcmtkb3duL2Rpc3Qvc25hcmtkb3duLmpzIiwicGFja2FnZS5qc29uIiwic3JjL3BsdWdpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6T0E7QUFDQTs7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiKGZ1bmN0aW9uKCkge1xuXG4gICAgY29uc3QgcGFja2FnZSA9IHJlcXVpcmUoJy4uL3BhY2thZ2UuanNvbicpO1xuICAgIHdpbmRvdy5DaGF0RW5naW5lQ29yZS5wbHVnaW5bcGFja2FnZS5uYW1lXSA9IHJlcXVpcmUoJy4uL3NyYy9wbHVnaW4uanMnKTtcblxufSkoKTtcbiIsIi8vXG4vLyBEb3R0eSBtYWtlcyBpdCBlYXN5IHRvIHByb2dyYW1tYXRpY2FsbHkgYWNjZXNzIGFyYml0cmFyaWx5IG5lc3RlZCBvYmplY3RzIGFuZFxuLy8gdGhlaXIgcHJvcGVydGllcy5cbi8vXG5cbi8vXG4vLyBgb2JqZWN0YCBpcyBhbiBvYmplY3QsIGBwYXRoYCBpcyB0aGUgcGF0aCB0byB0aGUgcHJvcGVydHkgeW91IHdhbnQgdG8gY2hlY2tcbi8vIGZvciBleGlzdGVuY2Ugb2YuXG4vL1xuLy8gYHBhdGhgIGNhbiBiZSBwcm92aWRlZCBhcyBlaXRoZXIgYSBgXCJzdHJpbmcuc2VwYXJhdGVkLndpdGguZG90c1wiYCBvciBhc1xuLy8gYFtcImFuXCIsIFwiYXJyYXlcIl1gLlxuLy9cbi8vIFJldHVybnMgYHRydWVgIGlmIHRoZSBwYXRoIGNhbiBiZSBjb21wbGV0ZWx5IHJlc29sdmVkLCBgZmFsc2VgIG90aGVyd2lzZS5cbi8vXG5cbnZhciBleGlzdHMgPSBtb2R1bGUuZXhwb3J0cy5leGlzdHMgPSBmdW5jdGlvbiBleGlzdHMob2JqZWN0LCBwYXRoKSB7XG4gIGlmICh0eXBlb2YgcGF0aCA9PT0gXCJzdHJpbmdcIikge1xuICAgIHBhdGggPSBwYXRoLnNwbGl0KFwiLlwiKTtcbiAgfVxuXG4gIGlmICghKHBhdGggaW5zdGFuY2VvZiBBcnJheSkgfHwgcGF0aC5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBwYXRoID0gcGF0aC5zbGljZSgpO1xuXG4gIHZhciBrZXkgPSBwYXRoLnNoaWZ0KCk7XG5cbiAgaWYgKHR5cGVvZiBvYmplY3QgIT09IFwib2JqZWN0XCIgfHwgb2JqZWN0ID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaWYgKHBhdGgubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIE9iamVjdC5oYXNPd25Qcm9wZXJ0eS5hcHBseShvYmplY3QsIFtrZXldKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZXhpc3RzKG9iamVjdFtrZXldLCBwYXRoKTtcbiAgfVxufTtcblxuLy9cbi8vIFRoZXNlIGFyZ3VtZW50cyBhcmUgdGhlIHNhbWUgYXMgdGhvc2UgZm9yIGBleGlzdHNgLlxuLy9cbi8vIFRoZSByZXR1cm4gdmFsdWUsIGhvd2V2ZXIsIGlzIHRoZSBwcm9wZXJ0eSB5b3UncmUgdHJ5aW5nIHRvIGFjY2Vzcywgb3Jcbi8vIGB1bmRlZmluZWRgIGlmIGl0IGNhbid0IGJlIGZvdW5kLiBUaGlzIG1lYW5zIHlvdSB3b24ndCBiZSBhYmxlIHRvIHRlbGxcbi8vIHRoZSBkaWZmZXJlbmNlIGJldHdlZW4gYW4gdW5yZXNvbHZlZCBwYXRoIGFuZCBhbiB1bmRlZmluZWQgcHJvcGVydHksIHNvIHlvdSBcbi8vIHNob3VsZCBub3QgdXNlIGBnZXRgIHRvIGNoZWNrIGZvciB0aGUgZXhpc3RlbmNlIG9mIGEgcHJvcGVydHkuIFVzZSBgZXhpc3RzYFxuLy8gaW5zdGVhZC5cbi8vXG5cbnZhciBnZXQgPSBtb2R1bGUuZXhwb3J0cy5nZXQgPSBmdW5jdGlvbiBnZXQob2JqZWN0LCBwYXRoKSB7XG4gIGlmICh0eXBlb2YgcGF0aCA9PT0gXCJzdHJpbmdcIikge1xuICAgIHBhdGggPSBwYXRoLnNwbGl0KFwiLlwiKTtcbiAgfVxuXG4gIGlmICghKHBhdGggaW5zdGFuY2VvZiBBcnJheSkgfHwgcGF0aC5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBwYXRoID0gcGF0aC5zbGljZSgpO1xuXG4gIHZhciBrZXkgPSBwYXRoLnNoaWZ0KCk7XG5cbiAgaWYgKHR5cGVvZiBvYmplY3QgIT09IFwib2JqZWN0XCIgfHwgb2JqZWN0ID09PSBudWxsKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaWYgKHBhdGgubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIG9iamVjdFtrZXldO1xuICB9XG5cbiAgaWYgKHBhdGgubGVuZ3RoKSB7XG4gICAgcmV0dXJuIGdldChvYmplY3Rba2V5XSwgcGF0aCk7XG4gIH1cbn07XG5cbi8vXG4vLyBBcmd1bWVudHMgYXJlIHNpbWlsYXIgdG8gYGV4aXN0c2AgYW5kIGBnZXRgLCB3aXRoIHRoZSBleGNlcHRpb24gdGhhdCBwYXRoXG4vLyBjb21wb25lbnRzIGFyZSByZWdleGVzIHdpdGggc29tZSBzcGVjaWFsIGNhc2VzLiBJZiBhIHBhdGggY29tcG9uZW50IGlzIGBcIipcImBcbi8vIG9uIGl0cyBvd24sIGl0J2xsIGJlIGNvbnZlcnRlZCB0byBgLy4qL2AuXG4vL1xuLy8gVGhlIHJldHVybiB2YWx1ZSBpcyBhbiBhcnJheSBvZiB2YWx1ZXMgd2hlcmUgdGhlIGtleSBwYXRoIG1hdGNoZXMgdGhlXG4vLyBzcGVjaWZpZWQgY3JpdGVyaW9uLiBJZiBub25lIG1hdGNoLCBhbiBlbXB0eSBhcnJheSB3aWxsIGJlIHJldHVybmVkLlxuLy9cblxudmFyIHNlYXJjaCA9IG1vZHVsZS5leHBvcnRzLnNlYXJjaCA9IGZ1bmN0aW9uIHNlYXJjaChvYmplY3QsIHBhdGgpIHtcbiAgaWYgKHR5cGVvZiBwYXRoID09PSBcInN0cmluZ1wiKSB7XG4gICAgcGF0aCA9IHBhdGguc3BsaXQoXCIuXCIpO1xuICB9XG5cbiAgaWYgKCEocGF0aCBpbnN0YW5jZW9mIEFycmF5KSB8fCBwYXRoLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHBhdGggPSBwYXRoLnNsaWNlKCk7XG5cbiAgdmFyIGtleSA9IHBhdGguc2hpZnQoKTtcblxuICBpZiAodHlwZW9mIG9iamVjdCAhPT0gXCJvYmplY3RcIiB8fCBvYmplY3QgPT09IG51bGwpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBpZiAoa2V5ID09PSBcIipcIikge1xuICAgIGtleSA9IFwiLipcIjtcbiAgfVxuXG4gIGlmICh0eXBlb2Yga2V5ID09PSBcInN0cmluZ1wiKSB7XG4gICAga2V5ID0gbmV3IFJlZ0V4cChrZXkpO1xuICB9XG5cbiAgaWYgKHBhdGgubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKG9iamVjdCkuZmlsdGVyKGtleS50ZXN0LmJpbmQoa2V5KSkubWFwKGZ1bmN0aW9uKGspIHsgcmV0dXJuIG9iamVjdFtrXTsgfSk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIEFycmF5LnByb3RvdHlwZS5jb25jYXQuYXBwbHkoW10sIE9iamVjdC5rZXlzKG9iamVjdCkuZmlsdGVyKGtleS50ZXN0LmJpbmQoa2V5KSkubWFwKGZ1bmN0aW9uKGspIHsgcmV0dXJuIHNlYXJjaChvYmplY3Rba10sIHBhdGgpOyB9KSk7XG4gIH1cbn07XG5cbi8vXG4vLyBUaGUgZmlyc3QgdHdvIGFyZ3VtZW50cyBmb3IgYHB1dGAgYXJlIHRoZSBzYW1lIGFzIGBleGlzdHNgIGFuZCBgZ2V0YC5cbi8vXG4vLyBUaGUgdGhpcmQgYXJndW1lbnQgaXMgYSB2YWx1ZSB0byBgcHV0YCBhdCB0aGUgYHBhdGhgIG9mIHRoZSBgb2JqZWN0YC5cbi8vIE9iamVjdHMgaW4gdGhlIG1pZGRsZSB3aWxsIGJlIGNyZWF0ZWQgaWYgdGhleSBkb24ndCBleGlzdCwgb3IgYWRkZWQgdG8gaWZcbi8vIHRoZXkgZG8uIElmIGEgdmFsdWUgaXMgZW5jb3VudGVyZWQgaW4gdGhlIG1pZGRsZSBvZiB0aGUgcGF0aCB0aGF0IGlzICpub3QqXG4vLyBhbiBvYmplY3QsIGl0IHdpbGwgbm90IGJlIG92ZXJ3cml0dGVuLlxuLy9cbi8vIFRoZSByZXR1cm4gdmFsdWUgaXMgYHRydWVgIGluIHRoZSBjYXNlIHRoYXQgdGhlIHZhbHVlIHdhcyBgcHV0YFxuLy8gc3VjY2Vzc2Z1bGx5LCBvciBgZmFsc2VgIG90aGVyd2lzZS5cbi8vXG5cbnZhciBwdXQgPSBtb2R1bGUuZXhwb3J0cy5wdXQgPSBmdW5jdGlvbiBwdXQob2JqZWN0LCBwYXRoLCB2YWx1ZSkge1xuICBpZiAodHlwZW9mIHBhdGggPT09IFwic3RyaW5nXCIpIHtcbiAgICBwYXRoID0gcGF0aC5zcGxpdChcIi5cIik7XG4gIH1cblxuICBpZiAoIShwYXRoIGluc3RhbmNlb2YgQXJyYXkpIHx8IHBhdGgubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIFxuICBwYXRoID0gcGF0aC5zbGljZSgpO1xuXG4gIHZhciBrZXkgPSBwYXRoLnNoaWZ0KCk7XG5cbiAgaWYgKHR5cGVvZiBvYmplY3QgIT09IFwib2JqZWN0XCIgfHwgb2JqZWN0ID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaWYgKHBhdGgubGVuZ3RoID09PSAwKSB7XG4gICAgb2JqZWN0W2tleV0gPSB2YWx1ZTtcbiAgfSBlbHNlIHtcbiAgICBpZiAodHlwZW9mIG9iamVjdFtrZXldID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICBvYmplY3Rba2V5XSA9IHt9O1xuICAgIH1cblxuICAgIGlmICh0eXBlb2Ygb2JqZWN0W2tleV0gIT09IFwib2JqZWN0XCIgfHwgb2JqZWN0W2tleV0gPT09IG51bGwpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICByZXR1cm4gcHV0KG9iamVjdFtrZXldLCBwYXRoLCB2YWx1ZSk7XG4gIH1cbn07XG5cbi8vXG4vLyBgcmVtb3ZlYCBpcyBsaWtlIGBwdXRgIGluIHJldmVyc2UhXG4vL1xuLy8gVGhlIHJldHVybiB2YWx1ZSBpcyBgdHJ1ZWAgaW4gdGhlIGNhc2UgdGhhdCB0aGUgdmFsdWUgZXhpc3RlZCBhbmQgd2FzIHJlbW92ZWRcbi8vIHN1Y2Nlc3NmdWxseSwgb3IgYGZhbHNlYCBvdGhlcndpc2UuXG4vL1xuXG52YXIgcmVtb3ZlID0gbW9kdWxlLmV4cG9ydHMucmVtb3ZlID0gZnVuY3Rpb24gcmVtb3ZlKG9iamVjdCwgcGF0aCwgdmFsdWUpIHtcbiAgaWYgKHR5cGVvZiBwYXRoID09PSBcInN0cmluZ1wiKSB7XG4gICAgcGF0aCA9IHBhdGguc3BsaXQoXCIuXCIpO1xuICB9XG5cbiAgaWYgKCEocGF0aCBpbnN0YW5jZW9mIEFycmF5KSB8fCBwYXRoLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBcbiAgcGF0aCA9IHBhdGguc2xpY2UoKTtcblxuICB2YXIga2V5ID0gcGF0aC5zaGlmdCgpO1xuXG4gIGlmICh0eXBlb2Ygb2JqZWN0ICE9PSBcIm9iamVjdFwiIHx8IG9iamVjdCA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlmIChwYXRoLmxlbmd0aCA9PT0gMCkge1xuICAgIGlmICghT2JqZWN0Lmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBrZXkpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgZGVsZXRlIG9iamVjdFtrZXldO1xuXG4gICAgcmV0dXJuIHRydWU7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHJlbW92ZShvYmplY3Rba2V5XSwgcGF0aCwgdmFsdWUpO1xuICB9XG59O1xuXG4vL1xuLy8gYGRlZXBLZXlzYCBjcmVhdGVzIGEgbGlzdCBvZiBhbGwgcG9zc2libGUga2V5IHBhdGhzIGZvciBhIGdpdmVuIG9iamVjdC5cbi8vXG4vLyBUaGUgcmV0dXJuIHZhbHVlIGlzIGFsd2F5cyBhbiBhcnJheSwgdGhlIG1lbWJlcnMgb2Ygd2hpY2ggYXJlIHBhdGhzIGluIGFycmF5XG4vLyBmb3JtYXQuIElmIHlvdSB3YW50IHRoZW0gaW4gZG90LW5vdGF0aW9uIGZvcm1hdCwgZG8gc29tZXRoaW5nIGxpa2UgdGhpczpcbi8vXG4vLyBgYGBqc1xuLy8gZG90dHkuZGVlcEtleXMob2JqKS5tYXAoZnVuY3Rpb24oZSkge1xuLy8gICByZXR1cm4gZS5qb2luKFwiLlwiKTtcbi8vIH0pO1xuLy8gYGBgXG4vL1xuLy8gKk5vdGU6IHRoaXMgd2lsbCBwcm9iYWJseSBleHBsb2RlIG9uIHJlY3Vyc2l2ZSBvYmplY3RzLiBCZSBjYXJlZnVsLipcbi8vXG5cbnZhciBkZWVwS2V5cyA9IG1vZHVsZS5leHBvcnRzLmRlZXBLZXlzID0gZnVuY3Rpb24gZGVlcEtleXMob2JqZWN0LCBwcmVmaXgpIHtcbiAgaWYgKHR5cGVvZiBwcmVmaXggPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBwcmVmaXggPSBbXTtcbiAgfVxuXG4gIHZhciBrZXlzID0gW107XG5cbiAgZm9yICh2YXIgayBpbiBvYmplY3QpIHtcbiAgICBpZiAoIU9iamVjdC5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgaykpIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIGtleXMucHVzaChwcmVmaXguY29uY2F0KFtrXSkpO1xuXG4gICAgaWYgKHR5cGVvZiBvYmplY3Rba10gPT09IFwib2JqZWN0XCIgJiYgb2JqZWN0W2tdICE9PSBudWxsKSB7XG4gICAgICBrZXlzID0ga2V5cy5jb25jYXQoZGVlcEtleXMob2JqZWN0W2tdLCBwcmVmaXguY29uY2F0KFtrXSkpKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4ga2V5cztcbn07XG4iLCJmdW5jdGlvbiBlKGUpe3JldHVybiBlLnJlcGxhY2UoUmVnRXhwKFwiXlwiKyhlLm1hdGNoKC9eKFxcdHwgKSsvKXx8XCJcIilbMF0sXCJnbVwiKSxcIlwiKX1mdW5jdGlvbiBuKGUpe3JldHVybihlK1wiXCIpLnJlcGxhY2UoL1wiL2csXCImcXVvdDtcIikucmVwbGFjZSgvPC9nLFwiJmx0O1wiKS5yZXBsYWNlKC8+L2csXCImZ3Q7XCIpfWZ1bmN0aW9uIHIoYSl7ZnVuY3Rpb24gYyhlKXt2YXIgbj10W2UucmVwbGFjZSgvXFwqL2csXCJfXCIpWzFdfHxcIlwiXSxyPWlbaS5sZW5ndGgtMV09PWU7cmV0dXJuIG4/blsxXT8oaVtyP1wicG9wXCI6XCJwdXNoXCJdKGUpLG5bMHxyXSk6blswXTplfWZ1bmN0aW9uIG8oKXtmb3IodmFyIGU9XCJcIjtpLmxlbmd0aDspZSs9YyhpW2kubGVuZ3RoLTFdKTtyZXR1cm4gZX12YXIgbCxnLHMscCx1LG09LygoPzpefFxcbispKD86XFxuLS0tK3xcXCogXFwqKD86IFxcKikrKVxcbil8KD86XmBgYChcXHcqKVxcbihbXFxzXFxTXSo/KVxcbmBgYCQpfCgoPzooPzpefFxcbispKD86XFx0fCAgezIsfSkuKykrXFxuKil8KCg/Oig/Ol58XFxuKShbPiorLV18XFxkK1xcLilcXHMrLiopKyl8KD86XFwhXFxbKFteXFxdXSo/KVxcXVxcKChbXlxcKV0rPylcXCkpfChcXFspfChcXF0oPzpcXCgoW15cXCldKz8pXFwpKT8pfCg/Oig/Ol58XFxuKykoW15cXHNdLiopXFxuKFxcLXszLH18PXszLH0pKD86XFxuK3wkKSl8KD86KD86XnxcXG4rKSgjezEsM30pXFxzKiguKykoPzpcXG4rfCQpKXwoPzpgKFteYF0uKj8pYCl8KCAgXFxuXFxuKnxcXG57Mix9fF9ffFxcKlxcKnxbXypdKS9nbSxpPVtdLGg9XCJcIixmPTAsJD17fTtmb3IoYT1hLnJlcGxhY2UoL15cXFsoLis/KVxcXTpcXHMqKC4rKSQvZ20sZnVuY3Rpb24oZSxuLHIpe3JldHVybiAkW24udG9Mb3dlckNhc2UoKV09cixcIlwifSkucmVwbGFjZSgvXlxcbit8XFxuKyQvZyxcIlwiKTtzPW0uZXhlYyhhKTspZz1hLnN1YnN0cmluZyhmLHMuaW5kZXgpLGY9bS5sYXN0SW5kZXgsbD1zWzBdLGcubWF0Y2goL1teXFxcXF0oXFxcXFxcXFwpKlxcXFwkLyl8fChzWzNdfHxzWzRdP2w9JzxwcmUgY2xhc3M9XCJjb2RlICcrKHNbNF0/XCJwb2V0cnlcIjpzWzJdLnRvTG93ZXJDYXNlKCkpKydcIj4nK2UobihzWzNdfHxzWzRdKS5yZXBsYWNlKC9eXFxuK3xcXG4rJC9nLFwiXCIpKStcIjwvcHJlPlwiOnNbNl0/KHU9c1s2XSx1Lm1hdGNoKC9cXC4vKSYmKHNbNV09c1s1XS5yZXBsYWNlKC9eXFxkKy9nbSxcIlwiKSkscD1yKGUoc1s1XS5yZXBsYWNlKC9eXFxzKls+KisuLV0vZ20sXCJcIikpKSxcIj5cIj09PXU/dT1cImJsb2NrcXVvdGVcIjoodT11Lm1hdGNoKC9cXC4vKT9cIm9sXCI6XCJ1bFwiLHA9cC5yZXBsYWNlKC9eKC4qKShcXG58JCkvZ20sXCI8bGk+JDE8L2xpPlwiKSksbD1cIjxcIit1K1wiPlwiK3ArXCI8L1wiK3UrXCI+XCIpOnNbOF0/bD0nPGltZyBzcmM9XCInK24oc1s4XSkrJ1wiIGFsdD1cIicrbihzWzddKSsnXCI+JzpzWzEwXT8oaD1oLnJlcGxhY2UoXCI8YT5cIiwnPGEgaHJlZj1cIicrbihzWzExXXx8JFtnLnRvTG93ZXJDYXNlKCldKSsnXCI+JyksbD1vKCkrXCI8L2E+XCIpOnNbOV0/bD1cIjxhPlwiOnNbMTJdfHxzWzE0XT8odT1cImhcIisoc1sxNF0/c1sxNF0ubGVuZ3RoOlwiPVwiPT09c1sxM11bMF0/MToyKSxsPVwiPFwiK3UrXCI+XCIrcihzWzEyXXx8c1sxNV0pK1wiPC9cIit1K1wiPlwiKTpzWzE2XT9sPVwiPGNvZGU+XCIrbihzWzE2XSkrXCI8L2NvZGU+XCI6KHNbMTddfHxzWzFdKSYmKGw9YyhzWzE3XXx8XCItLVwiKSkpLGgrPWcsaCs9bDtyZXR1cm4oaCthLnN1YnN0cmluZyhmKStvKCkpLnRyaW0oKX12YXIgdD17XCJcIjpbXCI8ZW0+XCIsXCI8L2VtPlwiXSxfOltcIjxzdHJvbmc+XCIsXCI8L3N0cm9uZz5cIl0sXCJcXG5cIjpbXCI8YnIgLz5cIl0sXCIgXCI6W1wiPGJyIC8+XCJdLFwiLVwiOltcIjxociAvPlwiXX07bW9kdWxlLmV4cG9ydHM9cjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXNuYXJrZG93bi5qcy5tYXAiLCJtb2R1bGUuZXhwb3J0cz17XG4gIFwibmFtZVwiOiBcImNoYXQtZW5naW5lLW1hcmtkb3duXCIsXG4gIFwiYXV0aG9yXCI6IFwiSWFuIEplbm5pbmdzXCIsXG4gIFwidmVyc2lvblwiOiBcIjAuMC41XCIsXG4gIFwibWFpblwiOiBcInNyYy9wbHVnaW4uanNcIixcbiAgXCJkZXBlbmRlbmNpZXNcIjoge1xuICAgIFwiZG90dHlcIjogXCIwLjAuMlwiLFxuICAgIFwiY2hhdC1lbmdpbmVcIjogXCIwLjIueFwiLFxuICAgIFwic25hcmtkb3duXCI6IFwiXjEuMi4yXCJcbiAgfSxcbiAgXCJkZXZEZXBlbmRlbmNpZXNcIjoge1xuICAgIFwiY2hhaVwiOiBcIl4zLjUuMFwiLFxuICAgIFwibW9jaGFcIjogXCJeMy4zLjBcIlxuICB9XG59XG4iLCJjb25zdCBzbmFya2Rvd24gPSByZXF1aXJlKCdzbmFya2Rvd24nKTtcbmNvbnN0IGRvdHR5ID0gcmVxdWlyZShcImRvdHR5XCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IChjb25maWcgPSB7fSkgPT4ge1xuXG4gICAgY29uZmlnLnByb3AgPSBjb25maWcucHJvcCB8fCAnZGF0YS50ZXh0JztcblxuICAgIGxldCBwYXJzZU1hcmtkb3duID0gZnVuY3Rpb24ocGF5bG9hZCwgbmV4dCkge1xuXG4gICAgICAgIGxldCB0ZXh0ID0gZG90dHkuZ2V0KHBheWxvYWQsIGNvbmZpZy5wcm9wKTtcblxuICAgICAgICBpZih0ZXh0KSB7XG4gICAgICAgICAgICBkb3R0eS5wdXQocGF5bG9hZCwgY29uZmlnLnByb3AsIHNuYXJrZG93bih0ZXh0KSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBjb250aW51ZSBhbG9uZyBtaWRkbGV3YXJlXG4gICAgICAgIG5leHQobnVsbCwgcGF5bG9hZCk7XG5cbiAgICB9O1xuXG4gICAgLy8gZGVmaW5lIGJvdGggdGhlIGV4dGVuZGVkIG1ldGhvZHMgYW5kIHRoZSBtaWRkbGV3YXJlIGluIG91ciBwbHVnaW5cbiAgICByZXR1cm4ge1xuICAgICAgICBuYW1lc3BhY2U6ICdtYXJrZG93bicsXG4gICAgICAgIG1pZGRsZXdhcmU6IHtcbiAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgJ21lc3NhZ2UnOiBwYXJzZU1hcmtkb3duLFxuICAgICAgICAgICAgICAgICckaGlzdG9yeS5tZXNzYWdlJzogcGFyc2VNYXJrZG93blxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgIH1cblxufVxuIl19
