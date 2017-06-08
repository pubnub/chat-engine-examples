(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function() {

    const package = require('../package.json');
    window.ChatEngineCore.plugin[package.name] = require('../src/plugin.js');

})();

},{"../package.json":2,"../src/plugin.js":3}],2:[function(require,module,exports){
module.exports={
  "author": "Ian Jennings",
  "name": "chat-engine-random-username",
  "version": "0.0.3",
  "main": "src/plugin.js",
  "dependencies": {
    "chat-engine": "0.2.x"
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy5udm0vdmVyc2lvbnMvbm9kZS92Ni43LjAvbGliL25vZGVfbW9kdWxlcy9jaGF0LWVuZ2luZS1wbHVnaW4vbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsIi50bXAvd3JhcC5qcyIsInBhY2thZ2UuanNvbiIsInNyYy9wbHVnaW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIihmdW5jdGlvbigpIHtcblxuICAgIGNvbnN0IHBhY2thZ2UgPSByZXF1aXJlKCcuLi9wYWNrYWdlLmpzb24nKTtcbiAgICB3aW5kb3cuQ2hhdEVuZ2luZUNvcmUucGx1Z2luW3BhY2thZ2UubmFtZV0gPSByZXF1aXJlKCcuLi9zcmMvcGx1Z2luLmpzJyk7XG5cbn0pKCk7XG4iLCJtb2R1bGUuZXhwb3J0cz17XG4gIFwiYXV0aG9yXCI6IFwiSWFuIEplbm5pbmdzXCIsXG4gIFwibmFtZVwiOiBcImNoYXQtZW5naW5lLXJhbmRvbS11c2VybmFtZVwiLFxuICBcInZlcnNpb25cIjogXCIwLjAuM1wiLFxuICBcIm1haW5cIjogXCJzcmMvcGx1Z2luLmpzXCIsXG4gIFwiZGVwZW5kZW5jaWVzXCI6IHtcbiAgICBcImNoYXQtZW5naW5lXCI6IFwiMC4yLnhcIlxuICB9XG59XG4iLCJ2YXIgcmFuZG9tTmFtZSA9ICgpID0+IHtcblxuICAgIC8vIGxpc3Qgb2YgZnJpZW5kbHkgYW5pbWFsc1xuICAgIGxldCBhbmltYWxzID0gWydwaWdlb24nLCAnc2VhZ3VsbCcsICdiYXQnLCAnb3dsJywgJ3NwYXJyb3dzJywgJ3JvYmluJywgJ2JsdWViaXJkJywgJ2NhcmRpbmFsJywgJ2hhd2snLCAnZmlzaCcsICdzaHJpbXAnLCAnZnJvZycsICd3aGFsZScsICdzaGFyaycsICdlZWwnLCAnc2VhbCcsICdsb2JzdGVyJywgJ29jdG9wdXMnLCAnbW9sZScsICdzaHJldycsICdyYWJiaXQnLCAnY2hpcG11bmsnLCAnYXJtYWRpbGxvJywgJ2RvZycsICdjYXQnLCAnbHlueCcsICdtb3VzZScsICdsaW9uJywgJ21vb3NlJywgJ2hvcnNlJywgJ2RlZXInLCAncmFjY29vbicsICd6ZWJyYScsICdnb2F0JywgJ2NvdycsICdwaWcnLCAndGlnZXInLCAnd29sZicsICdwb255JywgJ2FudGVsb3BlJywgJ2J1ZmZhbG8nLCAnY2FtZWwnLCAnZG9ua2V5JywgJ2VsaycsICdmb3gnLCAnbW9ua2V5JywgJ2dhemVsbGUnLCAnaW1wYWxhJywgJ2phZ3VhcicsICdsZW9wYXJkJywgJ2xlbXVyJywgJ3lhaycsICdlbGVwaGFudCcsICdnaXJhZmZlJywgJ2hpcHBvcG90YW11cycsICdyaGlub2Nlcm9zJywgJ2dyaXp6bHliZWFyJ107XG5cbiAgICAvLyBsaXN0IG9mIGZyaWVuZGx5IGNvbG9yc1xuICAgIGxldCBjb2xvcnMgPSBbJ3NpbHZlcicsICdncmF5JywgJ2JsYWNrJywgJ3JlZCcsICdtYXJvb24nLCAnb2xpdmUnLCAnbGltZScsICdncmVlbicsICd0ZWFsJywgJ2JsdWUnLCAnbmF2eScsICdmdWNoc2lhJywgJ3B1cnBsZSddO1xuXG4gICAgLy8gcmFuZG9tbHkgZ2VuZXJhdGUgYSBjb21ibyBvZiB0aGUgdHdvIGFuZCByZXR1cm4gaXRcbiAgICByZXR1cm4gY29sb3JzW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGNvbG9ycy5sZW5ndGgpXSArICdfJyArIGFuaW1hbHNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogYW5pbWFscy5sZW5ndGgpXTtcblxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IChjaGF0KSA9PiB7XG5cbiAgICAvLyBkZWZpbmUgc2VuZCBtaWRkbGV3YXJlXG4gICAgY2xhc3MgZXh0ZW5zaW9uIHtcbiAgICAgICAgY29uc3RydWN0ICgpIHtcblxuICAgICAgICAgICAgbGV0IHN0YXRlID0gdGhpcy5wYXJlbnQuc3RhdGUoY2hhdCk7XG5cbiAgICAgICAgICAgIHN0YXRlLnVzZXJuYW1lID0gcmFuZG9tTmFtZSgpO1xuXG4gICAgICAgICAgICB0aGlzLnBhcmVudC51cGRhdGUoc3RhdGUsIGNoYXQpO1xuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgLy8gZGVmaW5lIGJvdGggdGhlIGV4dGVuZGVkIG1ldGhvZHMgYW5kIHRoZSBtaWRkbGV3YXJlIGluIG91ciBwbHVnaW5cbiAgICByZXR1cm4ge1xuICAgICAgICBuYW1lc3BhY2U6ICdyYW5kb20tdXNlcm5hbWUnLFxuICAgICAgICBleHRlbmRzOiB7XG4gICAgICAgICAgICBNZTogZXh0ZW5zaW9uXG4gICAgICAgIH1cbiAgICB9XG5cbn1cbiJdfQ==
