import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IndrawgyHubService } from 'src/app/hub/indrawgy-hub.service';
import { DoodleNetEntry } from 'src/app/models/doodle-net-entry';
import { Guess } from 'src/app/models/guess';
import { AiDrawingComponent } from '../ai-drawing/ai-drawing.component';
import { GuessPlaceholderComponent } from '../guess-placeholder/guess-placeholder.component';

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

  constructor(private hub: IndrawgyHubService) {
    this.wordToGuess$ = hub.wordToGuess$;
    this.guessList$ = hub.updateGuessList$;
  }

  ngOnInit(): void {}
}
