# PubNub ChatEngine - Javascript Desktop Ex.

## Quick Setup
Great news! You're moments away from running your very own ChatEngine client.. In case you missed it, please ensure you have setup ChatEngine via PubNub's (Quick Start)[https://www.pubnub.com/docs/tutorials/chatengine] guide. Doing so will allow you to use your own PubNub application keyset.

Ensure a static file server is running from the parent directory of the repo.
If not, instantiate a static HTTP server from the project root (either NodeJS or Python):

```bash
## NodeJS v6:
http-server &

## Python:
python -m SimpleHTTPServer &

## To exit either server:
fg
CTRL-C
```

Once the server is running, open the javascript/desktop.html file in your preferred web browser:

```bash
## Open file with default browser:
> open javascript/desktop.html
```

To further experience the functionality of the Javascript ChatEngine example, open javascript/desktop.html in a local incognito browser to chat with yourself.

It should be noted that upon refreshing the webpage, a new user will be created for you to impersonate. After refreshing the chat webpgae, please note that users previously created will linger for a small time before the client determines the previously created user instance is _offline_.

## Personalization
By now you should have one desktop client (or more) running locally. Time to inject your PubNub publish & subscribe keys into the application.

Open javascript/desktop.js, find the following code snippet (its a the top of the file) and replace the demo's default publish & subscribe keys with your own:

```javascript
// Be sure to replace empty strings with your own App's Publish & Subscribe keys
// otherwise the demo keys will be used.
// WARNING: PUBNUB KEYS REQUIRED FOR EXAMPLE TO FUNCTION
const PUBLISH_KEY = '';
const SUBSCRIBE_KEY = '';

// just making sure you're paying attention
if (PUBLISH_KEY === '' || SUBSCRIBE_KEY === '') {
    throw new Error('You forgot to enter your keys')
}
```
Be wary when instantiating ChatEngine with argument `debug`:`true`. Leaving the option `true` will output `console.debug()` statements to the browser running the client. With greater load, this flag will cause delays and slowness. Be sure to set debug: `false` or simply don't include the arg (defaults to `false`).

Once finished, be sure to save the changes to javascript/desktop.js and refresh your browser. Once refreshed, the client application will utilize your personal PubNub keys to power ChatEngine. By removing the demo keys, you've setup a chat application which remains private to those who don't know your Publish & Subscribe keys.


### User Presence
Ideally a chat client would display whether or not users are online or offline. Thankfully PubNub's Presence feature provides such functionallity. Lets take a look at the `bindUsers()` function within javascript/desktop.js:

```javascript
// add PubNub Presence: to display users [online|offline] state
bindUsers: function() {

    // when a user comes online, render them in the online list
    this.chat.on('$.online.*', function(data) {
        app.users.unshift(data.user);
        app.renderUsers();
    });

    // when a user goes offline, remove them from the online list
    this.chat.on('$.offline.*', function(data) {

        for (var i in app.users) {
            if (app.users[i].uuid == data.user.uuid) {
                delete app.users[i];
            }
        }

        app.renderUsers();

    });

},
```

### Chat History
Currently the application does not render messages previously sent prior to invoking the current session. Thankfully CE allows one to easily populate the chat history with messages previously sent on a specified chat channel. To do so, uncomment the following snippet within below the `ready()` function within javacript/desktop.js:

```javascript
ready: function(data) {
    this.me = data.me;
    this.chat = new this.ChatEngine.Chat('chatengine-meta');

    // uncomment code below to leverage PubNub's MSG History feature
    this.chat.on('$.connected', () => {

        search for 50 old `message` events
        this.chat.search({
          event: 'message',
          limit: 50
        }).on('message', (data) => {

          // when messages are returned, render them like normal messages
          console.debug(data);
          app.renderMessage(data, true);

        });

    });

    this.bindEvents();
},
```

## Plugins
CE provides many off the shelf plugins, in this example I'll provide you with the steps to add markdown rendering to your chat messages. Navigate to the `ready()` function and uncomment the following:

```Javascript
// UNCOMMENT code below to enbale the 'markdown-plugin'
const markdown = ChatEngineCore.plugin['chat-engine-markdown']();
this.chat.plugin(markdown);
```

Lastly, in order for Handlebars to properly render the rich HTML, enclose both instances of `messageOutput` within javascript/desktop.html with triple curly brackets. See example below:

```HTML
<div class="message other-message float-right">
    {{{messageOutput}}}
</div>
```
