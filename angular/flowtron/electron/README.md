## To Install:

```
npm install
```

## To Run:

First open the ```app.js``` file located ```../chat-engine-examples/angular/flowtron/app.js``` and replace the empty string value for both the ```userPubKey``` and ```userSubKey``` (app.js:50-51).

```js
// REPLACE EMPTY STRING WITH ChatEngine PUB/SUB keys
const userPubKey = '';
const userSubKey = '';
```

Next to instantiate the electron app, perform the following:

```bash
electron main.js
```
