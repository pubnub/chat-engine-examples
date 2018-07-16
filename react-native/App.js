import React, { Component } from 'react';
import { AppRegistry, Button, Text, TextInput, Image, View, FlatList, ListView } from 'react-native';
import ChatEngineCore from 'chat-engine'
import ChatEngineGravatar from 'chat-engine-gravatar'

const now = new Date().getTime();
const username = ['user', now].join('-');

const ChatEngine = ChatEngineCore.create({
    publishKey: 'pub-c-01491c54-379f-4d4a-b20b-9a03c24447c7',
    subscribeKey: 'sub-c-eaf4a984-4356-11e8-91e7-8ad1b2d46395'
}, {
    namespace: 'rn-ce',
    debug: true
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

        console.log('updated')

        console.log(ChatEngine.me.state())

        if (this.state.chatInput) {

            ChatEngine.global.emit('message', {
                text: this.state.chatInput
            });

            this.setState({ chatInput: '' })

        }

    }

    componentDidMount() {

        ChatEngine.connect(username, 'auth-key', {
            signedOnTime: now,
            email: new Date().getTime()
        });

        ChatEngine.on('$.ready', (data) => {

            const me = data.me;

            me.plugin(ChatEngineGravatar({
                prop: ['states', ChatEngine.global.channel, 'email']
            }));

            ChatEngine.global.on('message', (payload) => {

                this.messages.push(payload);

                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(this.messages)
                });

            });

        });

    }

    render() {

        return (
            <View style = { { padding: 10 } } >
            <ListView enableEmptySections dataSource = { this.state.dataSource } renderRow = {
                (rowData) =>
                    <View>
                        <Image style ={{ width: 100, height: 100 }} source = {{ uri: 'https:' + rowData.sender.state().gravatar, cache: 'reload' }}/>
                        <Text>{rowData.sender.uuid}: {rowData.data.text}</Text>
                    </View>
                } />
            <TextInput
                style = { { height: 40 } }
                placeholder = "Enter Chat Message Here!"
                onChangeText = {
                    (text) => this.setChatInput(text) }
                value = { this.state.chatInput }
            />
            <Button
                onPress = {
                    () => { this.sendChat() } }
                title = "Send"
                color = "#841584"
            />
        </View>
        )

    }

}

AppRegistry.registerComponent('PizzaTranslator', () => PizzaTranslator);
