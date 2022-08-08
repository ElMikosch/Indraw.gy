import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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

  constructor(private facade: PlayerScreenFacade) {}

  async ngOnInit(): Promise<void> {}

  changePlayerReadyState(): void {
    this.playerReady = !this.playerReady;
    this.facade.changePlayerReadyState(this.playerReady);
  }
}
