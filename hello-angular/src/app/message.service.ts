import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  messages: string[] = [];

  add(toAdd: string) {
    this.messages.push(toAdd);
  }

  clear() {
    this.messages = [];
  }
}
