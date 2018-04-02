import registerServiceWorker from './registerServiceWorker';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ChatEngineCore from 'chat-engine'
import createReactClass from 'create-react-class'

registerServiceWorker();

const now = new Date().getTime();
const username = ['user', now].join('-');

const ChatEngine = ChatEngineCore.create({
    publishKey: 'pub-c-df1f983b-8334-44aa-b32b-2fa23eff1f8f',
    subscribeKey: 'sub-c-bf3164ba-f737-11e7-b8a6-46d99af2bb8c'
}, {
    globalChannel: 'chat-engine-react'
});

ChatEngine.connect(username, {
    signedOnTime: now
});

let Message = createReactClass({
    render: function() {

        console.log('mes', this.props)

        return ( <
            div > { this.props.uuid }: { this.props.text } <
            /div>
        );
    }
});

let Chat = createReactClass({

    getInitialState: function() {

        this.chat = new ChatEngine.Chat('my-new-chat');

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

            this.chat.emit('message', {
                text: this.state.chatInput
            });

            this.setState({ chatInput: '' })

        }

    },

    componentDidMount: function() {

        this.chat.on('message', (payload) => {

            let messages = this.state.messages;

            messages.push(payload);

            this.setState({messages});

        });

    },

    _handleKeyPress: function(e) {
        if (e.key === 'Enter') {
            this.sendChat();
        }
    },

    render: function() {

        console.log('render called')

        console.log(this.state.messages)

        let messageList = this.state.messages.map(function(payload){
            return <Message key={payload.timetoken} uuid={payload.sender.uuid} text={payload.data.text} />
        });

        return ( <
            div >
            <div id = "chat-output" > { messageList } < /div> <
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
