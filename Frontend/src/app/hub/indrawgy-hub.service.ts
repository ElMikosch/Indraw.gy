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
export class IndrawgyHubService {
  hubConnection!: HubConnection;
  sessionId!: string;

  timerUpdate$ = new Observable<number>();
  gameEnded$ = new Observable<unknown>();
  playerUpdate$ = new Observable<Player[]>();
  allPlayerReady$ = new Observable<boolean>();
  startSequenceTimer$ = new Observable<number>();
  currentGameStatus$ = new Observable<GameStatus>();

  constructor() {}

  public connect(): void {
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

    this.hubConnection.start().then(
      () => console.log('connected'),
      () => console.log('something went wrong while connecting with hub')
    );

    this.sessionId = sessionStorage.getItem('sessionId') || '';
  }

  async registerPlayer(): Promise<void> {
    await this.hubConnection.invoke('RegisterPlayer', this.sessionId);
  }

  async registerMainClient(): Promise<void> {
    await this.hubConnection.invoke('RegisterMainClient', this.sessionId);
  }

  async beginGameStartSequence(): Promise<void> {
    await this.hubConnection.invoke('beginGameStartSequence');
  }

  async stopGameStartSequence(): Promise<void> {
    await this.hubConnection.invoke('');
  }
}
