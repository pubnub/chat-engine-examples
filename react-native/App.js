import React, { Component } from 'react';
import { AppRegistry, Button, Text, TextInput, Image, View, FlatList, ListView } from 'react-native';
import ChatEngineCore from 'chat-engine'
import ChatEngineGravatar from 'chat-engine-gravatar'

const now = new Date().getTime();
const username = ['user', now].join('-');

const ChatEngine = ChatEngineCore.create({
    publishKey: 'pub-c-bcf4e625-d5e0-45de-9f74-f222bf63a4a1',
    subscribeKey: 'sub-c-70f29a7c-8927-11e7-af73-96e8309537a2',
}, {
    globalChannel: 'chat-engine-react-native',
    insecure: true
});

export default class PizzaTranslator extends Component {

    constructor(props) {

        super(props);

        this.messages = [];

        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            chatInput: '',
            dataSource: ds.cloneWithRows([]),
        };

    }

    setChatInput(value) {
        this.setState({ chatInput: value })
    }

    sendChat() {

        if (this.state.chatInput) {

            ChatEngine.global.emit('message', {
                text: this.state.chatInput
            });

            this.setState({ chatInput: '' })

        }

    }

    componentDidMount() {


        ChatEngine.connect(username, {
            signedOnTime: now,
            email: new Date()
        });

        ChatEngine.on('$.ready', (data) => {

            const me = data.me;

            me.plugin(ChatEngineGravatar());

            ChatEngine.global.on('message', (payload) => {

                console.log(payload)

                console.log('gravatar', 'https:' + payload.sender.state().gravatar)

                this.messages.push(payload);

                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(this.messages)
                });

            });

        });

    }

    render() {

        return ( <
            View style = { { padding: 10 } } >
            <
            ListView dataSource = { this.state.dataSource } renderRow = {
                (rowData) => < View > < Image style = { { width: 100, height: 100 } } source = { { uri: 'https:' + rowData.sender.state().gravatar, cache: 'reload' } }
                /><Text>{rowData.sender.uuid}: {rowData.data.text}</Text > < /View>} /
                >
                <
                TextInput
                style = { { height: 40 } }
                placeholder = "Enter Chat Message Here!"
                onChangeText = {
                    (text) => this.setChatInput(text) }
                value = { this.state.chatInput }
                /> <
                Button
                onPress = {
                    () => { this.sendChat() } }
                title = "Send"
                color = "#841584"
                accessibilityLabel = "Learn more about this purple button" /
                >
                <
                /View>
            )


        }

    }

    AppRegistry.registerComponent('PizzaTranslator', () => PizzaTranslator);
