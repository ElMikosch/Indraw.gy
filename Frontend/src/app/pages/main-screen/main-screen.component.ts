import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import {
  NgxQrcodeElementTypes,
  NgxQrcodeErrorCorrectionLevels,
  NgxQRCodeModule,
} from '@techiediaries/ngx-qrcode';
import { IndrawgyHubService } from 'src/app/hub/indrawgy-hub.service';
import { SessionService } from 'src/app/services/session.service';
import { GameLayoutComponent } from './game-layout/game-layout.component';
import { MainScreenFacade } from './main-screen.facade';

@UntilDestroy()
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
  public gameEnded = false;
  public gameBegins = false;
  public gameStarted = false;

  constructor(
    public sessionService: SessionService,
    private facade: MainScreenFacade,
    public indrawgyHub: IndrawgyHubService
  ) {}

  async ngOnInit(): Promise<void> {
    this.sessionService.createLoginLink();
    setTimeout(() => {
      this.indrawgyHub.registerMainClient();
    }, 1000);

    this.indrawgyHub.gameEnded$
      .pipe(untilDestroyed(this))
      .subscribe(() => (this.gameEnded = true));
  }

  async resetGame() {
    await this.facade.resetGame();
    location.reload();
  }

  async startGame() {
    await this.facade.startGame();
  }
}
