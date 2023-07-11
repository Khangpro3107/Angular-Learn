import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  // constructor() {
  //   const timeNow = new Date()
  //   localStorage.removeItem("MessageServiceInit")
  //   localStorage.setItem("MessageServiceInit", `${timeNow.toTimeString()} - ${timeNow.getMilliseconds()}`)
  // }
  // ngOnDestroy() {
  //   const timeNow = new Date()
  //   localStorage.removeItem("MessageServiceDestroyed")
  //   localStorage.setItem("MessageServiceDestroyed", `${timeNow.toTimeString()} - ${timeNow.getMilliseconds()}`)

  // }
  messages: string[] = [];

  add(message: string) {
    this.messages.push(message);
  }

  clear() {
    this.messages = [];
  }
}
