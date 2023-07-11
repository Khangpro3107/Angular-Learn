import { Component } from '@angular/core';
import { MessageService } from '../../services/message/message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent {
  constructor(public messageService: MessageService) {
    const timeNow = new Date()
    localStorage.removeItem("MessageComponentInit")
    localStorage.setItem("MessageComponentInit", `${timeNow.toTimeString()} - ${timeNow.getMilliseconds()}`)
  }
  ngOnDestroy() {
    const timeNow = new Date()
    localStorage.removeItem("MessageComponentDestroyed")
    localStorage.setItem("MessageComponentDestroyed", `${timeNow.toTimeString()} - ${timeNow.getMilliseconds()}`)
  }
}
