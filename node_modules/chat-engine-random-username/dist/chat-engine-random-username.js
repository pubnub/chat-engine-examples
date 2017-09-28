(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function() {

    const package = require('../package.json');
    window.ChatEngineCore.plugin[package.name] = require('../src/plugin.js');

})();

},{"../package.json":2,"../src/plugin.js":3}],2:[function(require,module,exports){
module.exports={
  "author": "Ian Jennings",
  "name": "chat-engine-random-username",
  "version": "0.0.4",
  "main": "src/plugin.js",
  "dependencies": {
    "chat-engine": "0.2.x"
  }
}

},{}],3:[function(require,module,exports){
/**
* Update a {@link Me}'s state by randomly combining a color and an animal. Ex: "teal_seal"
* @module chat-engine-random-username
*/
const randomName = () => {

    // list of friendly animals
    let animals = ['pigeon', 'seagull', 'bat', 'owl', 'sparrows', 'robin', 'bluebird', 'cardinal', 'hawk', 'fish', 'shrimp', 'frog', 'whale', 'shark', 'eel', 'seal', 'lobster', 'octopus', 'mole', 'shrew', 'rabbit', 'chipmunk', 'armadillo', 'dog', 'cat', 'lynx', 'mouse', 'lion', 'moose', 'horse', 'deer', 'raccoon', 'zebra', 'goat', 'cow', 'pig', 'tiger', 'wolf', 'pony', 'antelope', 'buffalo', 'camel', 'donkey', 'elk', 'fox', 'monkey', 'gazelle', 'impala', 'jaguar', 'leopard', 'lemur', 'yak', 'elephant', 'giraffe', 'hippopotamus', 'rhinoceros', 'grizzlybear'];

    // list of friendly colors
    let colors = ['silver', 'gray', 'black', 'red', 'maroon', 'olive', 'lime', 'green', 'teal', 'blue', 'navy', 'fuchsia', 'purple'];

    // randomly generate a combo of the two and return it
    return colors[Math.floor(Math.random() * colors.length)] + '_' + animals[Math.floor(Math.random() * animals.length)];

}

/**
* @function
*/
module.exports = () => {

    class extension {

        construct () {

            let state = this.parent.state;

            /**
            @member state"."username
            @ceextends User
            */
            state.username = randomName();

            this.parent.update(state);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy5udm0vdmVyc2lvbnMvbm9kZS92Ni4xMS4wL2xpYi9ub2RlX21vZHVsZXMvY2hhdC1lbmdpbmUtcGx1Z2luL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIudG1wL3dyYXAuanMiLCJwYWNrYWdlLmpzb24iLCJzcmMvcGx1Z2luLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiKGZ1bmN0aW9uKCkge1xuXG4gICAgY29uc3QgcGFja2FnZSA9IHJlcXVpcmUoJy4uL3BhY2thZ2UuanNvbicpO1xuICAgIHdpbmRvdy5DaGF0RW5naW5lQ29yZS5wbHVnaW5bcGFja2FnZS5uYW1lXSA9IHJlcXVpcmUoJy4uL3NyYy9wbHVnaW4uanMnKTtcblxufSkoKTtcbiIsIm1vZHVsZS5leHBvcnRzPXtcbiAgXCJhdXRob3JcIjogXCJJYW4gSmVubmluZ3NcIixcbiAgXCJuYW1lXCI6IFwiY2hhdC1lbmdpbmUtcmFuZG9tLXVzZXJuYW1lXCIsXG4gIFwidmVyc2lvblwiOiBcIjAuMC40XCIsXG4gIFwibWFpblwiOiBcInNyYy9wbHVnaW4uanNcIixcbiAgXCJkZXBlbmRlbmNpZXNcIjoge1xuICAgIFwiY2hhdC1lbmdpbmVcIjogXCIwLjIueFwiXG4gIH1cbn1cbiIsIi8qKlxuKiBVcGRhdGUgYSB7QGxpbmsgTWV9J3Mgc3RhdGUgYnkgcmFuZG9tbHkgY29tYmluaW5nIGEgY29sb3IgYW5kIGFuIGFuaW1hbC4gRXg6IFwidGVhbF9zZWFsXCJcbiogQG1vZHVsZSBjaGF0LWVuZ2luZS1yYW5kb20tdXNlcm5hbWVcbiovXG5jb25zdCByYW5kb21OYW1lID0gKCkgPT4ge1xuXG4gICAgLy8gbGlzdCBvZiBmcmllbmRseSBhbmltYWxzXG4gICAgbGV0IGFuaW1hbHMgPSBbJ3BpZ2VvbicsICdzZWFndWxsJywgJ2JhdCcsICdvd2wnLCAnc3BhcnJvd3MnLCAncm9iaW4nLCAnYmx1ZWJpcmQnLCAnY2FyZGluYWwnLCAnaGF3aycsICdmaXNoJywgJ3NocmltcCcsICdmcm9nJywgJ3doYWxlJywgJ3NoYXJrJywgJ2VlbCcsICdzZWFsJywgJ2xvYnN0ZXInLCAnb2N0b3B1cycsICdtb2xlJywgJ3NocmV3JywgJ3JhYmJpdCcsICdjaGlwbXVuaycsICdhcm1hZGlsbG8nLCAnZG9nJywgJ2NhdCcsICdseW54JywgJ21vdXNlJywgJ2xpb24nLCAnbW9vc2UnLCAnaG9yc2UnLCAnZGVlcicsICdyYWNjb29uJywgJ3plYnJhJywgJ2dvYXQnLCAnY293JywgJ3BpZycsICd0aWdlcicsICd3b2xmJywgJ3BvbnknLCAnYW50ZWxvcGUnLCAnYnVmZmFsbycsICdjYW1lbCcsICdkb25rZXknLCAnZWxrJywgJ2ZveCcsICdtb25rZXknLCAnZ2F6ZWxsZScsICdpbXBhbGEnLCAnamFndWFyJywgJ2xlb3BhcmQnLCAnbGVtdXInLCAneWFrJywgJ2VsZXBoYW50JywgJ2dpcmFmZmUnLCAnaGlwcG9wb3RhbXVzJywgJ3JoaW5vY2Vyb3MnLCAnZ3JpenpseWJlYXInXTtcblxuICAgIC8vIGxpc3Qgb2YgZnJpZW5kbHkgY29sb3JzXG4gICAgbGV0IGNvbG9ycyA9IFsnc2lsdmVyJywgJ2dyYXknLCAnYmxhY2snLCAncmVkJywgJ21hcm9vbicsICdvbGl2ZScsICdsaW1lJywgJ2dyZWVuJywgJ3RlYWwnLCAnYmx1ZScsICduYXZ5JywgJ2Z1Y2hzaWEnLCAncHVycGxlJ107XG5cbiAgICAvLyByYW5kb21seSBnZW5lcmF0ZSBhIGNvbWJvIG9mIHRoZSB0d28gYW5kIHJldHVybiBpdFxuICAgIHJldHVybiBjb2xvcnNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogY29sb3JzLmxlbmd0aCldICsgJ18nICsgYW5pbWFsc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBhbmltYWxzLmxlbmd0aCldO1xuXG59XG5cbi8qKlxuKiBAZnVuY3Rpb25cbiovXG5tb2R1bGUuZXhwb3J0cyA9ICgpID0+IHtcblxuICAgIGNsYXNzIGV4dGVuc2lvbiB7XG5cbiAgICAgICAgY29uc3RydWN0ICgpIHtcblxuICAgICAgICAgICAgbGV0IHN0YXRlID0gdGhpcy5wYXJlbnQuc3RhdGU7XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgQG1lbWJlciBzdGF0ZVwiLlwidXNlcm5hbWVcbiAgICAgICAgICAgIEBjZWV4dGVuZHMgVXNlclxuICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHN0YXRlLnVzZXJuYW1lID0gcmFuZG9tTmFtZSgpO1xuXG4gICAgICAgICAgICB0aGlzLnBhcmVudC51cGRhdGUoc3RhdGUpO1xuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgLy8gZGVmaW5lIGJvdGggdGhlIGV4dGVuZGVkIG1ldGhvZHMgYW5kIHRoZSBtaWRkbGV3YXJlIGluIG91ciBwbHVnaW5cbiAgICByZXR1cm4ge1xuICAgICAgICBuYW1lc3BhY2U6ICdyYW5kb20tdXNlcm5hbWUnLFxuICAgICAgICBleHRlbmRzOiB7XG4gICAgICAgICAgICBNZTogZXh0ZW5zaW9uXG4gICAgICAgIH1cbiAgICB9XG5cbn1cbiJdfQ==
