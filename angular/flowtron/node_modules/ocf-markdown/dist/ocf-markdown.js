(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function() {

    const package = require('../package.json');
    window.OpenChatFramework.plugin[package.name] = require('../src/plugin.js');

})();

},{"../package.json":3,"../src/plugin.js":4}],2:[function(require,module,exports){
function e(e){return e.replace(RegExp("^"+(e.match(/^(\t| )+/)||"")[0],"gm"),"")}function n(e){return(e+"").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function r(a){function c(e){var n=t[e.replace(/\*/g,"_")[1]||""],r=i[i.length-1]==e;return n?n[1]?(i[r?"pop":"push"](e),n[0|r]):n[0]:e}function o(){for(var e="";i.length;)e+=c(i[i.length-1]);return e}var l,g,s,p,u,m=/((?:^|\n+)(?:\n---+|\* \*(?: \*)+)\n)|(?:^```(\w*)\n([\s\S]*?)\n```$)|((?:(?:^|\n+)(?:\t|  {2,}).+)+\n*)|((?:(?:^|\n)([>*+-]|\d+\.)\s+.*)+)|(?:\!\[([^\]]*?)\]\(([^\)]+?)\))|(\[)|(\](?:\(([^\)]+?)\))?)|(?:(?:^|\n+)([^\s].*)\n(\-{3,}|={3,})(?:\n+|$))|(?:(?:^|\n+)(#{1,3})\s*(.+)(?:\n+|$))|(?:`([^`].*?)`)|(  \n\n*|\n{2,}|__|\*\*|[_*])/gm,i=[],h="",f=0,$={};for(a=a.replace(/^\[(.+?)\]:\s*(.+)$/gm,function(e,n,r){return $[n.toLowerCase()]=r,""}).replace(/^\n+|\n+$/g,"");s=m.exec(a);)g=a.substring(f,s.index),f=m.lastIndex,l=s[0],g.match(/[^\\](\\\\)*\\$/)||(s[3]||s[4]?l='<pre class="code '+(s[4]?"poetry":s[2].toLowerCase())+'">'+e(n(s[3]||s[4]).replace(/^\n+|\n+$/g,""))+"</pre>":s[6]?(u=s[6],u.match(/\./)&&(s[5]=s[5].replace(/^\d+/gm,"")),p=r(e(s[5].replace(/^\s*[>*+.-]/gm,""))),">"===u?u="blockquote":(u=u.match(/\./)?"ol":"ul",p=p.replace(/^(.*)(\n|$)/gm,"<li>$1</li>")),l="<"+u+">"+p+"</"+u+">"):s[8]?l='<img src="'+n(s[8])+'" alt="'+n(s[7])+'">':s[10]?(h=h.replace("<a>",'<a href="'+n(s[11]||$[g.toLowerCase()])+'">'),l=o()+"</a>"):s[9]?l="<a>":s[12]||s[14]?(u="h"+(s[14]?s[14].length:"="===s[13][0]?1:2),l="<"+u+">"+r(s[12]||s[15])+"</"+u+">"):s[16]?l="<code>"+n(s[16])+"</code>":(s[17]||s[1])&&(l=c(s[17]||"--"))),h+=g,h+=l;return(h+a.substring(f)+o()).trim()}var t={"":["<em>","</em>"],_:["<strong>","</strong>"],"\n":["<br />"]," ":["<br />"],"-":["<hr />"]};module.exports=r;

},{}],3:[function(require,module,exports){
module.exports={
  "name": "ocf-markdown",
  "version": "0.0.1",
  "main": "src/plugin.js",
  "dependencies": {
    "ocf": "^0.0.4",
    "snarkdown": "^1.2.2"
  },
  "devDependencies": {
    "chai": "^3.5.0",
    "mocha": "^3.3.0"
  }
}

},{}],4:[function(require,module,exports){
const snarkdown = require('snarkdown');

module.exports = (config) => {

    let parseMarkdown = function(payload, next) {

        if(payload.data.text) {
            payload.data.text = snarkdown(payload.data.text);
        }

        // continue along middleware
        next(null, payload);

    };

    // define middleware to run after a message has been received and OCF has processed it
    let broadcast = {
        'message': parseMarkdown,
        '$history.message': parseMarkdown
    };

    // define both the extended methods and the middleware in our plugin
    return {
        namespace: 'markdown',
        middleware: {
            broadcast: broadcast
        },
    }

}

},{"snarkdown":2}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy5udm0vdmVyc2lvbnMvbm9kZS92Ni43LjAvbGliL25vZGVfbW9kdWxlcy9vY2YtcGx1Z2luL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIudG1wL3dyYXAuanMiLCJub2RlX21vZHVsZXMvc25hcmtkb3duL2Rpc3Qvc25hcmtkb3duLmpzIiwicGFja2FnZS5qc29uIiwic3JjL3BsdWdpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7O0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIoZnVuY3Rpb24oKSB7XG5cbiAgICBjb25zdCBwYWNrYWdlID0gcmVxdWlyZSgnLi4vcGFja2FnZS5qc29uJyk7XG4gICAgd2luZG93Lk9wZW5DaGF0RnJhbWV3b3JrLnBsdWdpbltwYWNrYWdlLm5hbWVdID0gcmVxdWlyZSgnLi4vc3JjL3BsdWdpbi5qcycpO1xuXG59KSgpO1xuIiwiZnVuY3Rpb24gZShlKXtyZXR1cm4gZS5yZXBsYWNlKFJlZ0V4cChcIl5cIisoZS5tYXRjaCgvXihcXHR8ICkrLyl8fFwiXCIpWzBdLFwiZ21cIiksXCJcIil9ZnVuY3Rpb24gbihlKXtyZXR1cm4oZStcIlwiKS5yZXBsYWNlKC9cIi9nLFwiJnF1b3Q7XCIpLnJlcGxhY2UoLzwvZyxcIiZsdDtcIikucmVwbGFjZSgvPi9nLFwiJmd0O1wiKX1mdW5jdGlvbiByKGEpe2Z1bmN0aW9uIGMoZSl7dmFyIG49dFtlLnJlcGxhY2UoL1xcKi9nLFwiX1wiKVsxXXx8XCJcIl0scj1pW2kubGVuZ3RoLTFdPT1lO3JldHVybiBuP25bMV0/KGlbcj9cInBvcFwiOlwicHVzaFwiXShlKSxuWzB8cl0pOm5bMF06ZX1mdW5jdGlvbiBvKCl7Zm9yKHZhciBlPVwiXCI7aS5sZW5ndGg7KWUrPWMoaVtpLmxlbmd0aC0xXSk7cmV0dXJuIGV9dmFyIGwsZyxzLHAsdSxtPS8oKD86XnxcXG4rKSg/Olxcbi0tLSt8XFwqIFxcKig/OiBcXCopKylcXG4pfCg/Ol5gYGAoXFx3KilcXG4oW1xcc1xcU10qPylcXG5gYGAkKXwoKD86KD86XnxcXG4rKSg/OlxcdHwgIHsyLH0pLispK1xcbiopfCgoPzooPzpefFxcbikoWz4qKy1dfFxcZCtcXC4pXFxzKy4qKSspfCg/OlxcIVxcWyhbXlxcXV0qPylcXF1cXCgoW15cXCldKz8pXFwpKXwoXFxbKXwoXFxdKD86XFwoKFteXFwpXSs/KVxcKSk/KXwoPzooPzpefFxcbispKFteXFxzXS4qKVxcbihcXC17Myx9fD17Myx9KSg/Olxcbit8JCkpfCg/Oig/Ol58XFxuKykoI3sxLDN9KVxccyooLispKD86XFxuK3wkKSl8KD86YChbXmBdLio/KWApfCggIFxcblxcbip8XFxuezIsfXxfX3xcXCpcXCp8W18qXSkvZ20saT1bXSxoPVwiXCIsZj0wLCQ9e307Zm9yKGE9YS5yZXBsYWNlKC9eXFxbKC4rPylcXF06XFxzKiguKykkL2dtLGZ1bmN0aW9uKGUsbixyKXtyZXR1cm4gJFtuLnRvTG93ZXJDYXNlKCldPXIsXCJcIn0pLnJlcGxhY2UoL15cXG4rfFxcbiskL2csXCJcIik7cz1tLmV4ZWMoYSk7KWc9YS5zdWJzdHJpbmcoZixzLmluZGV4KSxmPW0ubGFzdEluZGV4LGw9c1swXSxnLm1hdGNoKC9bXlxcXFxdKFxcXFxcXFxcKSpcXFxcJC8pfHwoc1szXXx8c1s0XT9sPSc8cHJlIGNsYXNzPVwiY29kZSAnKyhzWzRdP1wicG9ldHJ5XCI6c1syXS50b0xvd2VyQ2FzZSgpKSsnXCI+JytlKG4oc1szXXx8c1s0XSkucmVwbGFjZSgvXlxcbit8XFxuKyQvZyxcIlwiKSkrXCI8L3ByZT5cIjpzWzZdPyh1PXNbNl0sdS5tYXRjaCgvXFwuLykmJihzWzVdPXNbNV0ucmVwbGFjZSgvXlxcZCsvZ20sXCJcIikpLHA9cihlKHNbNV0ucmVwbGFjZSgvXlxccypbPiorLi1dL2dtLFwiXCIpKSksXCI+XCI9PT11P3U9XCJibG9ja3F1b3RlXCI6KHU9dS5tYXRjaCgvXFwuLyk/XCJvbFwiOlwidWxcIixwPXAucmVwbGFjZSgvXiguKikoXFxufCQpL2dtLFwiPGxpPiQxPC9saT5cIikpLGw9XCI8XCIrdStcIj5cIitwK1wiPC9cIit1K1wiPlwiKTpzWzhdP2w9JzxpbWcgc3JjPVwiJytuKHNbOF0pKydcIiBhbHQ9XCInK24oc1s3XSkrJ1wiPic6c1sxMF0/KGg9aC5yZXBsYWNlKFwiPGE+XCIsJzxhIGhyZWY9XCInK24oc1sxMV18fCRbZy50b0xvd2VyQ2FzZSgpXSkrJ1wiPicpLGw9bygpK1wiPC9hPlwiKTpzWzldP2w9XCI8YT5cIjpzWzEyXXx8c1sxNF0/KHU9XCJoXCIrKHNbMTRdP3NbMTRdLmxlbmd0aDpcIj1cIj09PXNbMTNdWzBdPzE6MiksbD1cIjxcIit1K1wiPlwiK3Ioc1sxMl18fHNbMTVdKStcIjwvXCIrdStcIj5cIik6c1sxNl0/bD1cIjxjb2RlPlwiK24oc1sxNl0pK1wiPC9jb2RlPlwiOihzWzE3XXx8c1sxXSkmJihsPWMoc1sxN118fFwiLS1cIikpKSxoKz1nLGgrPWw7cmV0dXJuKGgrYS5zdWJzdHJpbmcoZikrbygpKS50cmltKCl9dmFyIHQ9e1wiXCI6W1wiPGVtPlwiLFwiPC9lbT5cIl0sXzpbXCI8c3Ryb25nPlwiLFwiPC9zdHJvbmc+XCJdLFwiXFxuXCI6W1wiPGJyIC8+XCJdLFwiIFwiOltcIjxiciAvPlwiXSxcIi1cIjpbXCI8aHIgLz5cIl19O21vZHVsZS5leHBvcnRzPXI7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1zbmFya2Rvd24uanMubWFwIiwibW9kdWxlLmV4cG9ydHM9e1xuICBcIm5hbWVcIjogXCJvY2YtbWFya2Rvd25cIixcbiAgXCJ2ZXJzaW9uXCI6IFwiMC4wLjFcIixcbiAgXCJtYWluXCI6IFwic3JjL3BsdWdpbi5qc1wiLFxuICBcImRlcGVuZGVuY2llc1wiOiB7XG4gICAgXCJvY2ZcIjogXCJeMC4wLjRcIixcbiAgICBcInNuYXJrZG93blwiOiBcIl4xLjIuMlwiXG4gIH0sXG4gIFwiZGV2RGVwZW5kZW5jaWVzXCI6IHtcbiAgICBcImNoYWlcIjogXCJeMy41LjBcIixcbiAgICBcIm1vY2hhXCI6IFwiXjMuMy4wXCJcbiAgfVxufVxuIiwiY29uc3Qgc25hcmtkb3duID0gcmVxdWlyZSgnc25hcmtkb3duJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gKGNvbmZpZykgPT4ge1xuXG4gICAgbGV0IHBhcnNlTWFya2Rvd24gPSBmdW5jdGlvbihwYXlsb2FkLCBuZXh0KSB7XG5cbiAgICAgICAgaWYocGF5bG9hZC5kYXRhLnRleHQpIHtcbiAgICAgICAgICAgIHBheWxvYWQuZGF0YS50ZXh0ID0gc25hcmtkb3duKHBheWxvYWQuZGF0YS50ZXh0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGNvbnRpbnVlIGFsb25nIG1pZGRsZXdhcmVcbiAgICAgICAgbmV4dChudWxsLCBwYXlsb2FkKTtcblxuICAgIH07XG5cbiAgICAvLyBkZWZpbmUgbWlkZGxld2FyZSB0byBydW4gYWZ0ZXIgYSBtZXNzYWdlIGhhcyBiZWVuIHJlY2VpdmVkIGFuZCBPQ0YgaGFzIHByb2Nlc3NlZCBpdFxuICAgIGxldCBicm9hZGNhc3QgPSB7XG4gICAgICAgICdtZXNzYWdlJzogcGFyc2VNYXJrZG93bixcbiAgICAgICAgJyRoaXN0b3J5Lm1lc3NhZ2UnOiBwYXJzZU1hcmtkb3duXG4gICAgfTtcblxuICAgIC8vIGRlZmluZSBib3RoIHRoZSBleHRlbmRlZCBtZXRob2RzIGFuZCB0aGUgbWlkZGxld2FyZSBpbiBvdXIgcGx1Z2luXG4gICAgcmV0dXJuIHtcbiAgICAgICAgbmFtZXNwYWNlOiAnbWFya2Rvd24nLFxuICAgICAgICBtaWRkbGV3YXJlOiB7XG4gICAgICAgICAgICBicm9hZGNhc3Q6IGJyb2FkY2FzdFxuICAgICAgICB9LFxuICAgIH1cblxufVxuIl19
