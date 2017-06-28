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

    this.state = {
        messages: [],
        chatInput: ''
    };

    console.log('run')
    console.log(this.state)

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

      console.log('message!')

      this.state.messages.push(payload);

      // let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

      console.log(this.state.messages.length)
      // 
      // this.setState({
      //   messages: ds.cloneWithRows(this.state.messages),
      // });

    });

  }

  render () {

    return (
      <View style={{padding: 10}}>
      <FlatList
        data={[
          {key: 'Devin'},
          {key: 'Jackson'},
          {key: 'James'},
          {key: 'Joel'},
          {key: 'John'},
          {key: 'Jillian'},
          {key: 'Jimmy'},
          {key: 'Julie'},
        ]}
        renderItem={({item}) => <Text>{item.key}</Text>}
      />
        <FlatList
          data={this.state.messages}
          renderItem={(item) => <Text>{item.sender.uuid} {item.sender.text}</Text>}
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
