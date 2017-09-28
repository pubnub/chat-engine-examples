import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ChatEngineCore from 'chat-engine'

const now = new Date().getTime();
const username = ['user', now].join('-');

const ChatEngine = ChatEngineCore.create({
        publishKey: 'pub-c-c6303bb2-8bf8-4417-aac7-e83b52237ea6',
        subscribeKey: 'sub-c-67db0e7a-50be-11e7-bf50-02ee2ddab7fe'
    }, {
        endpoint: 'http://localhost:3000/insecure',
    globalChannel: 'chat-engine-react'
});

ChatEngine.connect(username, {
    signedOnTime: now
}, 'auth-key');

var Message = React.createClass({
    render: function() {
        return ( <
            div > { this.props.uuid }: { this.props.text } <
            /div>
        );
    }
});

var Chat = React.createClass({

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

        if (this.state.chatInput) {

            ChatEngine.global.emit('message', {
                text: this.state.chatInput
            });

            this.setState({ chatInput: '' })

        }

    },

    componentDidMount: function() {

        ChatEngine.global.on('message', (payload) => {

            let messages = this.state.messages;

            messages.push( <
                Message key = { this.state.messages.length } uuid = { payload.sender.uuid } text = { payload.data.text }
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
            div id = "chat-output" > { this.state.messages } < /div> <
            input id = "chat-input"
            type = "text"
            name = ""
            value = { this.state.chatInput } onChange = { this.setChatInput } onKeyPress = { this._handleKeyPress }
            /> <
            input type = "button"
            onClick = { this.sendChat } value = "Send Chat" / >
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
