# PubNub ChatEngine - Javascript Desktop Ex.

## Quick Setup
Great news! You're moments away from running your very own ChatEngine client.. In case you missed it, please ensure you have setup ChatEngine via PubNub's (Quick Start)[https://www.pubnub.com/docs/tutorials/chatengine] guide. Doing so will allow you to use your own PubNub application keyset.

Firstly, ensure you're running the latest NodeJS v6:

```bash
## check node version
> node --version

## if version is not 6.x.x, install node v6 with [nvm](https://github.com/creationix/nvm/blob/master/README.md "NPM Homepage").
> nvm install 6
> nvm use v6
```

Additionally, ensure a static file server is running from the parent directory of the repo:

If not, instantiate a static HTTP server from the project root (either NodeJS or Python):

```bash
## NodeJS v6:
> http-server &

## Python:
> python -m SimpleHTTPServer &

## To exit either server:
> fg
> CTRL-C
```

Once the server is running, open the javascript/desktop.html file in your preferred web browser:

```bash
## Open file with default browser:
> open javascript/desktop.html
```

To further experience the functionality of the Javascript ChatEngine example, open javascript/desktop.html in a local incognito browser to chat with yourself.

## Personalization
By now you should have one desktop client (or more) running locally. Time to inject your PubNub publish & subscribe keys into the application.

Open javascript/desktop.js, find the following code snippet and replace the demo's default publish & subscribe keys with your own:

```python
// Make sure to import ChatEngine first!
this.ChatEngine = ChatEngineCore.create({
    publishKey: 'REPLACE_WITH_PN_PUBLISH_KEY',
    subscribeKey: 'REPLACE_WITH_PN_SUBSCRIBE_KEY'
}, {
    debug: true,
    globalChannel: 'chat-engine-desktop-demo'
});
```

Once finished, be sure to save the changes to javascript/desktop.js and refresh your browser. Once refreshed, the client application will utilize your personal PubNub keys to power ChatEngine. By removing the demo keys, you've setup a chat application which remains private to those who don't know your Publish & Subscribe keys.
