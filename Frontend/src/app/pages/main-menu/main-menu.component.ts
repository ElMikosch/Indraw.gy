import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameMode } from 'src/app/models/game-mode';
import { MainMenuFacade } from './main.menu.facade';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss'],
  providers: [MainMenuFacade],
})
export class MainMenuComponent implements OnInit {
  public rounds: number;
  GameMode = GameMode;

  constructor(private facade: MainMenuFacade, private router: Router) {
    this.rounds = 10;
  }

  async ngOnInit(): Promise<void> {
    const gameIsRunning = await this.facade.gameIsRunning();
    if (gameIsRunning) await this.router.navigate(['game']);
  }

  async onSelectGameMode(gameMode: GameMode) {
    await this.facade.startGame(gameMode, this.rounds);
    await this.router.navigate(['game']);
  }
}
