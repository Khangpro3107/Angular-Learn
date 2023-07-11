import { Injectable } from '@angular/core';

@Injectable()
export class ComponentServiceService {

  constructor() {
    const timeNow = new Date()
    localStorage.removeItem("ComponentServiceInit")
    localStorage.setItem("ComponentServiceInit", `${timeNow.toTimeString()} - ${timeNow.getMilliseconds()}`)
  }

  ngOnDestroy() {
    const timeNow = new Date()
    localStorage.removeItem("ComponentServiceDestroyed")
    localStorage.setItem("ComponentServiceDestroyed", `${timeNow.toTimeString()} - ${timeNow.getMilliseconds()}`)
  }
}
