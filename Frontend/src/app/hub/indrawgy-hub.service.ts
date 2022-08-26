import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class IndrawgyHubService {
  //Define types for these props
  timerUpdate$: any;
  gameEnded$: any;
  roundEnd$: any;
  roundStart$: any;
  wordToGuess$: any;
  updateGuessList$: any;
  playerUpdate$: any;
  allPlayerReady$: any;
  startSequenceTimer$: any;
  currentGameStatus$: any;
  drawPointOnMainClient$: any;
  drawLineOnMainClient$: any;
  resetGame$: any;

  constructor() {
    //Please implement constructor it should build and start the connection.
    //You also need a way to trigger the observables
  }

  //Implement following methods
  async register(): Promise<void> {}

  async startRound(): Promise<void> {}

  private async onConnected() {}

  private async onReconnected(connectionId: string | undefined) {}

  async beginGameStartSequence(): Promise<void> {}
}
