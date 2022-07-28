import { Injectable } from '@angular/core';
import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from '@microsoft/signalr';
import { Observable, ReplaySubject } from 'rxjs';
import { DoodleNetEntry } from '../models/doodle-net-entry';
import { Guess } from '../models/guess';

@Injectable({
  providedIn: 'root',
})
export class IndrawgyHubService {
  hubConnection!: HubConnection;
  sessionId!: string;

  timerUpdate$ = new Observable<number>();
  gameEnded$ = new Observable<unknown>();
  roundEnd$ = new Observable<unknown>();
  roundStart$ = new Observable<unknown>();
  wordToGuess$ = new Observable<DoodleNetEntry>();
  updateGuessList$ = new Observable<Guess[]>();

  constructor() {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl('/hubs/indrawgy')
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
      this[<keyof IndrawgyHubService>n] = subject.asObservable() as any;
    });

    this.hubConnection.start().then(this.onConnected.bind(this));
    this.hubConnection.onreconnected(this.onReconnected.bind(this));

    this.sessionId = sessionStorage.getItem('sessionId') || '';
  }

  async register(): Promise<void> {
    await this.hubConnection.invoke('Register', this.sessionId);
  }

  async startRound(): Promise<void> {
    await this.hubConnection.invoke('StartRound', this.sessionId);
  }

  private async onConnected() {
    await this.register();
  }

  private async onReconnected(connectionId: string | undefined) {
    await this.register();
  }
}
