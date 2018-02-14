import { Injectable } from '@angular/core';
import { ChatEngineCore } from 'chat-engine';

@Injectable()
export class ChatEngine {
  instance: any;
  create: any;
  plugin: any;
  me: any = { state: {} };
  chat: any = {};
  chats: any[] = [];
  constructor() {
    this.instance = ChatEngineCore.create(
      {
        publishKey: 'pub-c-d8599c43-cecf-42ba-a72f-aa3b24653c2b',
        subscribeKey: 'sub-c-6c6c021c-c4e2-11e7-9628-f616d8b03518'
      },
      {
        debug: true,
        globalChannel: 'chat-engine-angular2-simple'
      });

    this.create = ChatEngineCore.create.bind(this);
    this.plugin = ChatEngineCore.plugin;
  }

  newChat(user) {
    // define a channel
    let chat = new Date().getTime();
    // create a new chat with that channel
    let newChat = new this.instance.Chat(chat);
    // we need to auth ourselves before we can invite others
    newChat.on('$.connected', () => {
      // this fires a private invite to the user
      newChat.invite(user);
      // add the chat to the list
      this.chats.push(newChat);
    });
  }
}
