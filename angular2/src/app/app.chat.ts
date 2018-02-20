import {Component, Input, OnInit } from '@angular/core';
import {ChatEngine} from './chatEngine';
declare var require: any;
const typing = require('chat-engine-typing-indicator');

@Component({
  selector: 'app-chat',
  templateUrl: './templates/app.chat.html'
})
export class AppChatComponent implements OnInit {
  private ce: any;
  @Input() chat: any;
  @Input() index: number;
  messages: any[] = [];
  message: string;
  mysearch: string = '';
  users: any[] = [];

  constructor(private chatEngine: ChatEngine) {
    this.ce = chatEngine;
  }

  ngOnInit() {
    this.chat.plugin(typing({ timeout: 5000 }));
    this.chat.on('message', (payload) => {
      // if the last message was sent from the same user
      payload.sameUser = this.messages.length > 0 && payload.sender.uuid === this.messages[this.messages.length - 1].sender.uuid;

      // if this message was sent by this client
      payload.isSelf = payload.sender.name === 'Me';

      // add the message to the array
      this.messages.push(payload);
    });

    // when we get notified of a user typing
    this.chat.on('$typingIndicator.startTyping', (event) => {
      event.sender.isTyping = true;
    });

    // when we get notified a user stops typing
    this.chat.on('$typingIndicator.stopTyping', (event) => {
      event.sender.isTyping = false;
    });
  }

  getUsers(obj) {
    let users: any = [];

    if (obj) {
      Object.keys(obj).forEach((key) => {
        users.push(obj[key]);
      });
    }

    return users;
  }

  leave() {
    this.chat.leave();
    this.ce.chats.splice(this.index, 1);

    return false;
  }

  invite(user) {
    this.chat.invite(user);
    this.users = [];

    return false;
  }

  send() {
    this.chat.emit('message', { text: this.message });
    this.message = '';
  }

  search() {
    if (this.mysearch.length >= 2) {
      this.users = this.ce.chat.onlineUserSearch.search(this.mysearch);
    } else {
      this.users = [];
    }
  }
}
