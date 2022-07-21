import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerGuessFacade } from './player-guess.facade';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-player-guess',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [PlayerGuessFacade],
  templateUrl: './player-guess.component.html',
  styleUrls: ['./player-guess.component.scss'],
})
export class PlayerGuessComponent {
  public guess: string;

  public guesses: string[];

  constructor(private facacde: PlayerGuessFacade) {
    this.guess = '';
    this.guesses = [];
  }

  canGuess() {
    return this.guess !== '';
  }

  async sendGuess() {
    const isGuessCorrect = await this.facacde.sendGuess(this.guess);
    this.guesses.push(this.guess);
    this.guess = '';
  }
}
