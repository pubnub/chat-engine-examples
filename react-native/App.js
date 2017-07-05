import React, { Component } from 'react';
import { AppRegistry, Button, Text, TextInput, View, FlatList, ListView } from 'react-native';
import ChatEngineCore from 'chat-engine'

const now = new Date().getTime();
const username = ['user', now].join('-');

const ChatEngine = ChatEngineCore.create({
  publishKey: 'pub-c-ea1b85f7-8895-4514-b0e0-b505eaaa1b62',
  subscribeKey: 'sub-c-7397fa12-43a3-11e6-bfbb-02ee2ddab7fe'
}, 'chat-engine-demo-react');

ChatEngine.connect(username, {
    signedOnTime: now
});

export default class PizzaTranslator extends Component {

  constructor(props) {

    super(props);

    this.messages = [];

    console.log('run')
    console.log(this.state)


    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      chatInput: '',
      dataSource: ds.cloneWithRows([]),
    };

  }

  setChatInput (value) {
    this.setState({chatInput: value})
  }

  sendChat () {

    console.log(this.state.chatInput)

    if(this.state.chatInput) {

        ChatEngine.globalChat.emit('message', {
            text: this.state.chatInput
        });

        this.setState({chatInput: ''})

    }

  }

  componentDidMount () {

    ChatEngine.globalChat.on('message', (payload) => {

      console.log('message!', payload.data.text)

      this.messages.push(payload);

      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this.messages)
      });


      console.log(this.messages.length)

    });

  }

  render () {

    return (
      <View style={{padding: 10}}>
      <ListView
        dataSource={this.state.dataSource}
        renderRow={(rowData) => <Text>{rowData.data.text}</Text>}
      />
       <TextInput
         style={{height: 40}}
         placeholder="Enter Chat Message Here!"
         onChangeText={(text) => this.setChatInput(text)}
         value={this.state.chatInput}
       />
       <Button
          onPress={() => {this.sendChat()}}
          title="Send"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
     </View>
   )


  }

}

AppRegistry.registerComponent('PizzaTranslator', () => PizzaTranslator);
