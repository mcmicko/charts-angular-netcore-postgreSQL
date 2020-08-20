import { Component, OnInit, OnDestroy } from '@angular/core';
import { Server } from '../../shared/server';
import { ServerService } from 'src/app/service/server.service';
import { timer, Subscription } from 'rxjs';
import { ServerMessage } from 'src/app/shared/server-message';

@Component({
  selector: 'app-section-health',
  templateUrl: './section-health.component.html',
  styleUrls: ['./section-health.component.css'],
})
export class SectionHealthComponent implements OnInit, OnDestroy {
  constructor(private _serverService: ServerService) {}

  servers: Server[];
  timerSubscription: Subscription;

  ngOnInit() {
    this.refreshData();
  }

  ngOnDestroy() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  refreshData() {
    this._serverService.getServers().subscribe((res) => {
      this.servers = res;
    });

    this.subscribeToData();
  }

  subscribeToData() {
    this.timerSubscription = timer(3000).subscribe(() => this.refreshData());
  }

  sendMessage(msg: ServerMessage) {
    this._serverService.handleServerMessage(msg).subscribe(
      (res) => console.log('message sent to server:', msg),
      (err) => console.log('error', err)
    );
  }
}
