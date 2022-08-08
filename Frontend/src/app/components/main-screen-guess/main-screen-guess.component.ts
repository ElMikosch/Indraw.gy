import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable, startWith } from 'rxjs';
import { IndrawgyHubService } from 'src/app/hub/indrawgy-hub.service';
import { DoodleNetEntry } from 'src/app/models/doodle-net-entry';
import { Guess } from 'src/app/models/guess';
import { AiDrawingComponent } from '../ai-drawing/ai-drawing.component';
import { GuessPlaceholderComponent } from '../guess-placeholder/guess-placeholder.component';
import { GameStatus } from '../../models/game-status';
import { IndrawgyApi } from '../../services/indrawgy.api';
import { Player } from 'src/app/models/player';

@Component({
  selector: 'app-main-screen-guess',
  standalone: true,
  imports: [CommonModule, AiDrawingComponent, GuessPlaceholderComponent],
  templateUrl: './main-screen-guess.component.html',
  styleUrls: ['./main-screen-guess.component.scss'],
})
export class MainScreenGuessComponent implements OnInit {
  wordToGuess$: Observable<DoodleNetEntry>;
  guessList$: Observable<Guess[]>;
  currentGameStatus$!: Observable<GameStatus>;
  GameStatus = GameStatus;
  players$: Observable<Player[]>;

  constructor(private hub: IndrawgyHubService, private api: IndrawgyApi) {
    this.wordToGuess$ = hub.wordToGuess$;
    this.guessList$ = hub.updateGuessList$;
    this.players$ = hub.playerUpdate$;
  }

  async ngOnInit(): Promise<void> {
    const status = await this.api.get<GameStatus>('gameStatus');
    this.currentGameStatus$ = this.hub.currentGameStatus$.pipe(
      startWith(status)
    );
  }
}
