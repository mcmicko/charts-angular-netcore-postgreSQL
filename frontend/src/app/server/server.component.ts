import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ServerMessage } from '../shared/server-message';
import { Server } from '../shared/server';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css'],
})
export class ServerComponent implements OnInit {
  constructor() {}

  color: string;
  buttonText: string;
  serverStatus: string;
  isLoading: boolean;

  @Input()
  serverInput: Server;
  @Output() serverAction = new EventEmitter<ServerMessage>();

  ngOnInit(): void {
    this.setServerStatus(this.serverInput.isOnline);
  }

  setServerStatus(isOnline: boolean) {
    if (isOnline) {
      this.serverInput.isOnline = true;
      this.serverStatus = 'Online';
      this.color = '#66bb6a';
      this.buttonText = 'Shut Down';
    } else {
      this.serverInput.isOnline = false;
      this.color = '#ff6b6b';
      this.buttonText = 'Start';
    }
  }

  makeLoading() {
    this.color = '#ffCa28';
    this.buttonText = 'Pending...';
    this.isLoading = true;
    this.serverStatus = 'Loading';
  }

  sendServerAction(isOnline: boolean) {
    this.makeLoading();
    const payload = this.buildPayload(isOnline);
    this.serverAction.emit(payload);
  }

  buildPayload(isOnline: boolean): ServerMessage {
    if (isOnline) {
      return {
        id: this.serverInput.id,
        payload: 'deactive',
      };
    } else {
      return {
        id: this.serverInput.id,
        payload: 'active',
      };
    }
  }
}
