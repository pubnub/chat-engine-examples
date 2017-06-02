(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function() {

    const package = require('../package.json');
    window.OpenChatFramework.plugin[package.name] = require('../src/plugin.js');

})();

},{"../package.json":2,"../src/plugin.js":3}],2:[function(require,module,exports){
module.exports={
  "name": "ocf-random-username",
  "version": "0.0.1",
  "main": "src/plugin.js",
  "dependencies": {
    "ocf": "^0.0.4"
  }
}

},{}],3:[function(require,module,exports){
var randomName = () => {

    // list of friendly animals
    let animals = ['pigeon', 'seagull', 'bat', 'owl', 'sparrows', 'robin', 'bluebird', 'cardinal', 'hawk', 'fish', 'shrimp', 'frog', 'whale', 'shark', 'eel', 'seal', 'lobster', 'octopus', 'mole', 'shrew', 'rabbit', 'chipmunk', 'armadillo', 'dog', 'cat', 'lynx', 'mouse', 'lion', 'moose', 'horse', 'deer', 'raccoon', 'zebra', 'goat', 'cow', 'pig', 'tiger', 'wolf', 'pony', 'antelope', 'buffalo', 'camel', 'donkey', 'elk', 'fox', 'monkey', 'gazelle', 'impala', 'jaguar', 'leopard', 'lemur', 'yak', 'elephant', 'giraffe', 'hippopotamus', 'rhinoceros', 'grizzlybear'];

    // list of friendly colors
    let colors = ['silver', 'gray', 'black', 'red', 'maroon', 'olive', 'lime', 'green', 'teal', 'blue', 'navy', 'fuchsia', 'purple'];

    // randomly generate a combo of the two and return it
    return colors[Math.floor(Math.random() * colors.length)] + '_' + animals[Math.floor(Math.random() * animals.length)];

}

module.exports = (chat) => {

    // define send middleware
    class extension {
        construct () {

            let state = this.parent.state(chat);

            state.username = randomName();

            this.parent.update(state, chat);
        }

    };

    // define both the extended methods and the middleware in our plugin
    return {
        namespace: 'random-username',
        extends: {
            Me: extension
        }
    }

}

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy5udm0vdmVyc2lvbnMvbm9kZS92Ni43LjAvbGliL25vZGVfbW9kdWxlcy9vY2YtcGx1Z2luL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIudG1wL3dyYXAuanMiLCJwYWNrYWdlLmpzb24iLCJzcmMvcGx1Z2luLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiKGZ1bmN0aW9uKCkge1xuXG4gICAgY29uc3QgcGFja2FnZSA9IHJlcXVpcmUoJy4uL3BhY2thZ2UuanNvbicpO1xuICAgIHdpbmRvdy5PcGVuQ2hhdEZyYW1ld29yay5wbHVnaW5bcGFja2FnZS5uYW1lXSA9IHJlcXVpcmUoJy4uL3NyYy9wbHVnaW4uanMnKTtcblxufSkoKTtcbiIsIm1vZHVsZS5leHBvcnRzPXtcbiAgXCJuYW1lXCI6IFwib2NmLXJhbmRvbS11c2VybmFtZVwiLFxuICBcInZlcnNpb25cIjogXCIwLjAuMVwiLFxuICBcIm1haW5cIjogXCJzcmMvcGx1Z2luLmpzXCIsXG4gIFwiZGVwZW5kZW5jaWVzXCI6IHtcbiAgICBcIm9jZlwiOiBcIl4wLjAuNFwiXG4gIH1cbn1cbiIsInZhciByYW5kb21OYW1lID0gKCkgPT4ge1xuXG4gICAgLy8gbGlzdCBvZiBmcmllbmRseSBhbmltYWxzXG4gICAgbGV0IGFuaW1hbHMgPSBbJ3BpZ2VvbicsICdzZWFndWxsJywgJ2JhdCcsICdvd2wnLCAnc3BhcnJvd3MnLCAncm9iaW4nLCAnYmx1ZWJpcmQnLCAnY2FyZGluYWwnLCAnaGF3aycsICdmaXNoJywgJ3NocmltcCcsICdmcm9nJywgJ3doYWxlJywgJ3NoYXJrJywgJ2VlbCcsICdzZWFsJywgJ2xvYnN0ZXInLCAnb2N0b3B1cycsICdtb2xlJywgJ3NocmV3JywgJ3JhYmJpdCcsICdjaGlwbXVuaycsICdhcm1hZGlsbG8nLCAnZG9nJywgJ2NhdCcsICdseW54JywgJ21vdXNlJywgJ2xpb24nLCAnbW9vc2UnLCAnaG9yc2UnLCAnZGVlcicsICdyYWNjb29uJywgJ3plYnJhJywgJ2dvYXQnLCAnY293JywgJ3BpZycsICd0aWdlcicsICd3b2xmJywgJ3BvbnknLCAnYW50ZWxvcGUnLCAnYnVmZmFsbycsICdjYW1lbCcsICdkb25rZXknLCAnZWxrJywgJ2ZveCcsICdtb25rZXknLCAnZ2F6ZWxsZScsICdpbXBhbGEnLCAnamFndWFyJywgJ2xlb3BhcmQnLCAnbGVtdXInLCAneWFrJywgJ2VsZXBoYW50JywgJ2dpcmFmZmUnLCAnaGlwcG9wb3RhbXVzJywgJ3JoaW5vY2Vyb3MnLCAnZ3JpenpseWJlYXInXTtcblxuICAgIC8vIGxpc3Qgb2YgZnJpZW5kbHkgY29sb3JzXG4gICAgbGV0IGNvbG9ycyA9IFsnc2lsdmVyJywgJ2dyYXknLCAnYmxhY2snLCAncmVkJywgJ21hcm9vbicsICdvbGl2ZScsICdsaW1lJywgJ2dyZWVuJywgJ3RlYWwnLCAnYmx1ZScsICduYXZ5JywgJ2Z1Y2hzaWEnLCAncHVycGxlJ107XG5cbiAgICAvLyByYW5kb21seSBnZW5lcmF0ZSBhIGNvbWJvIG9mIHRoZSB0d28gYW5kIHJldHVybiBpdFxuICAgIHJldHVybiBjb2xvcnNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogY29sb3JzLmxlbmd0aCldICsgJ18nICsgYW5pbWFsc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBhbmltYWxzLmxlbmd0aCldO1xuXG59XG5cbm1vZHVsZS5leHBvcnRzID0gKGNoYXQpID0+IHtcblxuICAgIC8vIGRlZmluZSBzZW5kIG1pZGRsZXdhcmVcbiAgICBjbGFzcyBleHRlbnNpb24ge1xuICAgICAgICBjb25zdHJ1Y3QgKCkge1xuXG4gICAgICAgICAgICBsZXQgc3RhdGUgPSB0aGlzLnBhcmVudC5zdGF0ZShjaGF0KTtcblxuICAgICAgICAgICAgc3RhdGUudXNlcm5hbWUgPSByYW5kb21OYW1lKCk7XG5cbiAgICAgICAgICAgIHRoaXMucGFyZW50LnVwZGF0ZShzdGF0ZSwgY2hhdCk7XG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICAvLyBkZWZpbmUgYm90aCB0aGUgZXh0ZW5kZWQgbWV0aG9kcyBhbmQgdGhlIG1pZGRsZXdhcmUgaW4gb3VyIHBsdWdpblxuICAgIHJldHVybiB7XG4gICAgICAgIG5hbWVzcGFjZTogJ3JhbmRvbS11c2VybmFtZScsXG4gICAgICAgIGV4dGVuZHM6IHtcbiAgICAgICAgICAgIE1lOiBleHRlbnNpb25cbiAgICAgICAgfVxuICAgIH1cblxufVxuIl19
