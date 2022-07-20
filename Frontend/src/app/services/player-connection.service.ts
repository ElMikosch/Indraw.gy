import { Injectable } from '@angular/core';
import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from '@microsoft/signalr';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlayerConnectionService {
  hubConnection: HubConnection;
  sessionId: string;

  constructor() {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl('/hubs/player')
      .withAutomaticReconnect()
      .configureLogging(LogLevel.Information)
      .build();

    const signalRPropNames = Object.getOwnPropertyNames(this).filter((n) =>
      n.endsWith('$')
    );

    signalRPropNames.forEach((n) => {
      const methodName = n.substr(0, n.length - 1);
      const subject = new ReplaySubject<any>(1);
      this.hubConnection.on(methodName, (v) => {
        console.debug(`[signalr][${methodName}] ${JSON.stringify(v)}`);
        subject.next(v);
      });
      this[<keyof PlayerConnectionService>n] = subject.asObservable() as any;
    });

    this.hubConnection.start().then(this.onConnected.bind(this));
    this.hubConnection.onreconnected(this.onReconnected.bind(this));

    this.sessionId = sessionStorage.getItem('sessionId') || '';
  }

  private async onConnected() {
    console.log('connected');
    await this.register();
  }

  private async onReconnected(connectionId: string | undefined) {
    console.log('reconnected');
    await this.register();
  }

  private async register() {
    await this.hubConnection.invoke('RegisterPlayer', this.sessionId);
    console.log('registered');
  }
}
