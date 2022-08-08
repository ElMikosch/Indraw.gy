import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IndrawgyHubService } from 'src/app/hub/indrawgy-hub.service';
import { GameStatus } from 'src/app/models/game-status';
import { PlayerScreenFacade } from './player-screen.facade';

@Component({
  selector: 'app-player-screen',
  standalone: true,
  imports: [CommonModule],
  providers: [PlayerScreenFacade],
  templateUrl: './player-screen.component.html',
  styleUrls: ['./player-screen.component.scss'],
})
export class PlayerScreenComponent implements OnInit {
  playerReady = false;
  GameStatus = GameStatus;

  constructor(
    private facade: PlayerScreenFacade,
    public indrawgyHub: IndrawgyHubService
  ) {}

  async ngOnInit(): Promise<void> {
    await this.indrawgyHub.registerPlayer();
  }

  changePlayerReadyState(): void {
    this.playerReady = !this.playerReady;
    this.facade.changePlayerReadyState(this.playerReady);
  }
}
