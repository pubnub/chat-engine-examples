import {Component} from '@angular/core';
import {ChatEngine} from './chatEngine';

@Component({
  selector: 'app-chats',
  templateUrl: './templates/app.chats.html'
})
export class AppChatsComponent {
  private ce: any;

  constructor(private chatEngine: ChatEngine) {
    this.ce = chatEngine;
  }
}
