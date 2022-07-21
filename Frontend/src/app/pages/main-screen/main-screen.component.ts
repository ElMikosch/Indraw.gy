import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  NgxQrcodeElementTypes,
  NgxQrcodeErrorCorrectionLevels,
  NgxQRCodeModule,
} from '@techiediaries/ngx-qrcode';
import { SessionService } from 'src/app/services/session.service';
import { MainScreenFacade } from './main-screen.facade';
import { GameStatus } from '../../models/game-status';
import { GameMode } from '../../models/game-mode';

@Component({
  selector: 'app-main-screen',
  standalone: true,
  imports: [CommonModule, NgxQRCodeModule],
  providers: [MainScreenFacade],
  templateUrl: './main-screen.component.html',
  styleUrls: ['./main-screen.component.scss'],
})
export class MainScreenComponent implements OnInit {
  public elementType = 'url' as NgxQrcodeElementTypes;
  public errorCorrection = 'L' as NgxQrcodeErrorCorrectionLevels;
  public gameMode!: GameMode;
  GameMode = GameMode;

  constructor(
    public sessionService: SessionService,
    private facade: MainScreenFacade
  ) {}

  async ngOnInit(): Promise<void> {
    this.sessionService.createLoginLink();
    this.gameMode = await this.facade.getGameMode();
    console.log(this.gameMode);
  }

  async resetGame() {
    await this.facade.resetGame();
    location.reload();
  }
}
