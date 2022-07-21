import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { GameMode } from 'src/app/models/game-mode';
import { MainMenuFacade } from './main-menu.facade';
import { GameStatus } from '../../models/game-status';
import {AiDrawingComponent} from "../../components/ai-drawing/ai-drawing.component";

@Component({
  standalone: true,
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss'],
  providers: [MainMenuFacade],
  imports: [FormsModule, AiDrawingComponent],
})
export class MainMenuComponent implements OnInit {
  public rounds: number;
  GameMode = GameMode;

  constructor(private facade: MainMenuFacade, private router: Router) {
    this.rounds = 10;
  }

  async ngOnInit(): Promise<void> {}

  async onSelectGameMode(gameMode: GameMode) {
    await this.facade.createGame(gameMode, this.rounds);
    await this.router.navigate(['game']);
  }
}
