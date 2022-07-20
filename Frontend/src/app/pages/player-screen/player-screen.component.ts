import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerScreenFacade } from './player-screen.facade';
import { PlayerConnectionService } from '../../services/player-connection.service';

@Component({
  selector: 'app-player-screen',
  standalone: true,
  imports: [CommonModule],
  providers: [PlayerScreenFacade],
  templateUrl: './player-screen.component.html',
  styleUrls: ['./player-screen.component.scss'],
})
export class PlayerScreenComponent implements OnInit {
  constructor(private player: PlayerConnectionService) {}

  async ngOnInit(): Promise<void> {}
}
