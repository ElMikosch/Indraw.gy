import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { PlayerDrawComponent } from 'src/app/components/player-draw/player-draw.component';
import { IndrawgyHubService } from 'src/app/hub/indrawgy-hub.service';
import { GameMode } from 'src/app/models/game-mode';
import { PlayerGuessComponent } from '../../components/player-guess/player-guess.component';
import { GameStatus } from '../../models/game-status';
import { PlayerScreenFacade } from './player-screen.facade';

@Component({
  selector: 'app-player-screen',
  standalone: true,
  imports: [CommonModule, PlayerGuessComponent, PlayerDrawComponent],
  providers: [PlayerScreenFacade],
  templateUrl: './player-screen.component.html',
  styleUrls: ['./player-screen.component.scss'],
})
@UntilDestroy()
export class PlayerScreenComponent implements OnInit {
  constructor(
    public hub: IndrawgyHubService,
    private facade: PlayerScreenFacade
  ) {}
  public gameMode!: GameMode;
  GameMode = GameMode;

  public gameStatus!: GameStatus;
  GameStatus = GameStatus;
  playerReady = false;

  async ngOnInit(): Promise<void> {
    this.gameMode = await this.facade.getGameMode();
    this.gameStatus = await this.facade.getGameStatus();
    this.hub.gameEnded$
      .pipe(untilDestroyed(this))
      .subscribe(() => (this.playerReady = false));
  }

  changePlayerReadyState(): void {
    this.playerReady = !this.playerReady;
    this.facade.changePlayerReadyState(this.playerReady);
  }
}
