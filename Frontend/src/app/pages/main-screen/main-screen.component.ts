import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  NgxQrcodeElementTypes,
  NgxQrcodeErrorCorrectionLevels,
  NgxQRCodeModule,
} from '@techiediaries/ngx-qrcode';
import { IndrawgyHubService } from 'src/app/hub/indrawgy-hub.service';
import { SessionService } from 'src/app/services/session.service';
import { GameLayoutComponent } from './game-layout/game-layout.component';
import { MainScreenFacade } from './main-screen.facade';

@Component({
  selector: 'app-main-screen',
  standalone: true,
  imports: [CommonModule, NgxQRCodeModule, GameLayoutComponent],
  providers: [MainScreenFacade],
  templateUrl: './main-screen.component.html',
  styleUrls: ['./main-screen.component.scss'],
})
export class MainScreenComponent implements OnInit {
  public elementType = 'url' as NgxQrcodeElementTypes;
  public errorCorrection = 'L' as NgxQrcodeErrorCorrectionLevels;

  constructor(
    public sessionService: SessionService,
    private facade: MainScreenFacade,
    public indrawgyHub: IndrawgyHubService
  ) {}

  async ngOnInit(): Promise<void> {
    this.sessionService.createLoginLink();
    void this.indrawgyHub.registerMainClient();
  }

  async resetGame() {
    await this.facade.resetGame();
    location.reload();
  }

  async startGame() {
    await this.facade.startGame();
  }
}
