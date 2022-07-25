import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IndrawgyHubService } from 'src/app/hub/indrawgy-hub.service';
import { GameMode } from 'src/app/models/game-mode';
import { PlayerGuessComponent } from '../../components/player-guess/player-guess.component';
import { GameStatus } from '../../models/game-status';
import { PlayerScreenFacade } from './player-screen.facade';

@Component({
  selector: 'app-player-screen',
  standalone: true,
  imports: [CommonModule, PlayerGuessComponent],
  providers: [PlayerScreenFacade],
  templateUrl: './player-screen.component.html',
  styleUrls: ['./player-screen.component.scss'],
})
export class PlayerScreenComponent implements OnInit {
  constructor(
    private hub: IndrawgyHubService,
    private facade: PlayerScreenFacade
  ) {}
  public gameMode!: GameMode;
  GameMode = GameMode;

  public gameStatus!: GameStatus;
  GameStatus = GameStatus;

  async ngOnInit(): Promise<void> {
    this.gameMode = await this.facade.getGameMode();
    this.gameStatus = await this.facade.getGameStatus();
  }
}
