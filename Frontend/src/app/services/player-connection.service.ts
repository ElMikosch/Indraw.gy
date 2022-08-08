import { Injectable } from '@angular/core';
import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from '@microsoft/signalr';
import { Observable, ReplaySubject } from 'rxjs';
import { GameStatus } from '../models/game-status';
import { Player } from '../models/player';

@Injectable({
  providedIn: 'root',
})
export class PlayerConnectionService {
  hubConnection: HubConnection;
  sessionId: string;

  timerUpdate$ = new Observable<number>();
  gameEnded$ = new Observable<unknown>();
  playerUpdate$ = new Observable<Player[]>();
  allPlayerReady$ = new Observable<boolean>();
  startSequenceTimer$ = new Observable<number>();
  currentGameStatus$ = new Observable<GameStatus>();

  constructor() {}

  public connect(): void {
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

  async beginGameStartSequence(): Promise<void> {
    await this.hubConnection.invoke('beginGameStartSequence');
  }

  async stopGameStartSequence(): Promise<void> {
    await this.hubConnection.invoke('');
  }
}
