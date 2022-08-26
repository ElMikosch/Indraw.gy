import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { map, Observable, startWith } from 'rxjs';
import { IndrawgyHubService } from 'src/app/hub/indrawgy-hub.service';
import { DoodleNetEntry } from 'src/app/models/doodle-net-entry';
import { Guess } from 'src/app/models/guess';
import { Player } from 'src/app/models/player';
import { GameStatus } from '../../models/game-status';
import { IndrawgyApi } from '../../services/indrawgy.api';
import { AiDrawingComponent } from '../ai-drawing/ai-drawing.component';
import { GuessPlaceholderComponent } from '../guess-placeholder/guess-placeholder.component';

@Component({
  selector: 'app-main-screen-guess',
  standalone: true,
  imports: [CommonModule, AiDrawingComponent, GuessPlaceholderComponent],
  templateUrl: './main-screen-guess.component.html',
  styleUrls: ['./main-screen-guess.component.scss'],
})
@UntilDestroy()
export class MainScreenGuessComponent implements OnInit {
  wordToGuess$: Observable<DoodleNetEntry>;
  guessList$: Observable<Guess[]>;
  currentGameStatus$!: Observable<GameStatus>;
  GameStatus = GameStatus;
  players$: Observable<Player[]>;

  roundEnd: boolean = true;

  @ViewChild('scrollList') scrollList!: ElementRef<HTMLDivElement>;

  constructor(private hub: IndrawgyHubService, private api: IndrawgyApi) {
    this.wordToGuess$ = hub.wordToGuess$;
    this.guessList$ = hub.updateGuessList$;
    this.players$ = hub.playerUpdate$.pipe(
      map((players) => players.sort((a, z) => z.points - a.points))
    );
  }

  async ngOnInit(): Promise<void> {
    const status = await this.api.get<GameStatus>('gameStatus');
    this.currentGameStatus$ = this.hub.currentGameStatus$.pipe(
      startWith(status)
    );

    this.hub.roundEnd$
      .pipe(untilDestroyed(this))
      .subscribe((x) => (this.roundEnd = true));
    this.hub.roundStart$
      .pipe(untilDestroyed(this))
      .subscribe((x) => (this.roundEnd = false));
  }
}
