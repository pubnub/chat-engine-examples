import React, { Component } from 'react';
import { AppRegistry, Button, Text, TextInput, Image, View, FlatList, ListView, BackHandler } from 'react-native';
import ChatEngineCore from 'chat-engine'
import ChatEngineGravatar from 'chat-engine-gravatar'

const now = new Date().getTime();
const username = ['user', now].join('-');

const PUBLISH_KEY = 'pub-c-d8599c43-cecf-42ba-a72f-aa3b24653c2b';
const SUBSCRIBE_KEY = 'sub-c-6c6c021c-c4e2-11e7-9628-f616d8b03518';

if (PUBLISH_KEY == '' || SUBSCRIBE_KEY == '') {
    console.log('Please add \'PUBLISH_KEY\' and or \'SUBSCRIBE_KEY\'');
    BackHandler.exitApp('Please add \'PUBLISH_KEY\' and or \'SUBSCRIBE_KEY\'');
}

const ChatEngine = ChatEngineCore.create({
    publishKey: PUBLISH_KEY,
    subscribeKey: SUBSCRIBE_KEY
}, {
    globalChannel: 'react-native-demo',
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
        }, 'auth-key');

        ChatEngine.on('$.ready', (data) => {

            const me = data.me;

            me.plugin(ChatEngineGravatar());

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
            <View style = {{ padding: 10, flex: 1 , backgroundColor: 'powderblue' }} >
            <ListView dataSource = { this.state.dataSource } renderRow = {
                (rowData) =>
                    <View>
                        <Image style ={{ width: 100, height: 100 }} source = {{ uri: 'https:' + rowData.sender.state.gravatar, cache: 'reload' }}/>
                        <Text>{rowData.sender.uuid}: {rowData.data.text}</Text >
                    </View>
                } />
            <TextInput
                style = {{ height: 40, top: 100 , flex: 2}}
                placeholder = "Enter Chat Message Here!"
                onChangeText = {
                    (text) => this.setChatInput(text) }
                value = { this.state.chatInput }
            />
            <View style={{ flex: 3  }}>
                <Button
                    onPress = {
                        () => { this.sendChat() } }
                    title = "Send"
                    color = "#841584"
                    style = {{ top: 200 }}
                />
            </View>
        </View>)

        }

    }

    AppRegistry.registerComponent('PizzaTranslator', () => PizzaTranslator);
