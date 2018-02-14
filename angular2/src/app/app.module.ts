import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChatEngine } from './chatEngine';

import { AppComponent } from './app.component';
import { AppUsersOnlineComponent } from './app.usersOnline';
import { AppChatsComponent } from './app.chats';
import { AppChatComponent } from './app.chat';

@NgModule({
  declarations: [
    AppComponent,
    AppUsersOnlineComponent,
    AppChatsComponent,
    AppChatComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [ChatEngine],
  bootstrap: [AppComponent]
})
export class AppModule { }
