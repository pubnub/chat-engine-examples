import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ChatEngineCore from 'chat-engine'

const now = new Date().getTime();
const username = ['user', now].join('-');

const ChatEngine = ChatEngineCore.create({
    publishKey: 'pub-c-bcf4e625-d5e0-45de-9f74-f222bf63a4a1',
    subscribeKey: 'sub-c-70f29a7c-8927-11e7-af73-96e8309537a2',
}, {
    globalChannel: 'chat-engine-react',
    insecure: true
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
