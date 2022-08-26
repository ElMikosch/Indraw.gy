import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';
import { IndrawgyHubService } from 'src/app/hub/indrawgy-hub.service';
import { DoodleNetEntry } from 'src/app/models/doodle-net-entry';
import { GuessPlaceholderComponent } from '../guess-placeholder/guess-placeholder.component';
import { PlayerGuessFacade } from './player-guess.facade';

@Component({
  selector: 'app-player-guess',
  standalone: true,
  imports: [CommonModule, FormsModule, GuessPlaceholderComponent],
  providers: [PlayerGuessFacade],
  templateUrl: './player-guess.component.html',
  styleUrls: ['./player-guess.component.scss'],
})
@UntilDestroy()
export class PlayerGuessComponent {
  public guess: string;
  public guessList: string[];
  public guessCorrect: boolean;
  public wordToGuess$: Observable<DoodleNetEntry>;
  public isRoundRunning: boolean;

  constructor(
    private facacde: PlayerGuessFacade,
    private hub: IndrawgyHubService
  ) {
    this.guess = '';
    this.guessList = [];
    this.guessCorrect = false;
    this.wordToGuess$ = this.hub.wordToGuess$;
    this.isRoundRunning = false;

    this.hub.roundStart$.pipe(untilDestroyed(this)).subscribe(() => {
      this.isRoundRunning = true;
      this.guessCorrect = false;
      this.guessList = [];
    });

    this.hub.roundEnd$
      .pipe(untilDestroyed(this))
      .subscribe(() => (this.isRoundRunning = false));

    this.hub.wordToGuess$.pipe(untilDestroyed(this)).subscribe(() => {
      this.guessCorrect = false;
      this.guessList = [];
    });
  }

  canGuess() {
    return this.guess !== '' && !this.guessCorrect && this.isRoundRunning;
  }

  async sendGuess() {
    this.guessCorrect = await this.facacde.sendGuess(this.guess);
    this.guessList.push(this.guess);
    this.guess = '';
  }
}
