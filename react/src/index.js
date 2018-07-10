import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ChatEngineCore from 'chat-engine'

const now = new Date().getTime();
const username = ['user', now].join('-');

const ChatEngine = ChatEngineCore.create({
    publishKey: 'pub-c-01491c54-379f-4d4a-b20b-9a03c24447c7',
    subscribeKey: 'sub-c-eaf4a984-4356-11e8-91e7-8ad1b2d46395'
}, {
    namespace: 'ce-react',
    debug: true
});

ChatEngine.connect(username, 'auth-key', {
    signedOnTime: now
});

class Message extends React.Component{
    render () {
        return ( <
            div > { this.props.uuid }: { this.props.text } <
            /div>
        );
    }
};

var createReactClass = require('create-react-class');
var Chat = createReactClass({

    getInitialState: function() {
        return {
            messages: [],
            chatInput: ''
        };
    },

    setChatInput: function(event) {
        this.setState({ chatInput: event.target.value })
    },

    sendChat: function() {

        console.log('sendChat')

        if (this.state.chatInput) {

            console.log('emitting')

            ChatEngine.global.emit('message', {
                text: this.state.chatInput
            });

            this.setState({ chatInput: '' })

        }

    },

    componentDidMount: function() {

        ChatEngine.global.on('message', (payload) => {

            console.log('message')

            let messages = this.state.messages;

            messages.push( <
                Message key={ this.state.messages.length } uuid={ payload.sender.uuid } text={ payload.data.text }
                />
            );

            this.setState({
                messages: messages
            });

        });

    },

    _handleKeyPress: function(e) {
        if (e.key === 'Enter') {
            this.sendChat();
        }
    },

    render: function() {
        return ( <
            div >
            <
            div id="chat-output" > { this.state.messages } < /div> <
            input id="chat-input"
            type="text"
            name=""
            value={ this.state.chatInput } onChange={ this.setChatInput } onKeyPress={ this._handleKeyPress }
            /> <
            input type="button"
            onClick={ this.sendChat } value="Send Chat" / >
            <
            /div>
        );
    },
});

ChatEngine.on('$.ready', () => {

    ReactDOM.render( <
        Chat / > ,
        document.getElementById('root')
    );

});
