import { Component, OnInit } from '@angular/core';
import { ChatEngineCore } from 'chat-engine';
import { ChatEngine } from './chatEngine';
declare var require: any;
const random = require('chat-engine-random-username');
const search = require('chat-engine-online-user-search');

// console.log(search);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  private ce: any;

  constructor(private chatEngine: ChatEngine) {
    this.ce = chatEngine;
  }

  ngOnInit() {
    this.ce.instance.connect(new Date().getTime(), {}, 'auth-key');
    this.ce.instance.on('$.ready', (data) => {
      this.ce.me = data.me;
      this.ce.me.plugin(random());

      // when I get a private invit
      this.ce.me.direct.on('$.invite', (payload) => {
        const chat = new this.ce.instance.Chat(payload.data.channel);
        chat.onAny((a) => {
          console.log(a);
        });
        // create a new chat and render it in DOM
        this.ce.chats.push(chat);
      });

      this.ce.chat = this.ce.instance.global;
      this.ce.chat.plugin(search({ prop: 'state.username', caseSensitive: false }));
    });
  }
}
