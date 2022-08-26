import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import {
  NgxQrcodeElementTypes,
  NgxQrcodeErrorCorrectionLevels,
  NgxQRCodeModule,
} from '@techiediaries/ngx-qrcode';
import { Observable } from 'rxjs';
import { MainScreenGuessComponent } from 'src/app/components/main-screen-guess/main-screen-guess.component';
import { IndrawgyHubService } from 'src/app/hub/indrawgy-hub.service';
import { GameStatus } from 'src/app/models/game-status';
import { SessionService } from 'src/app/services/session.service';
import { GameMode } from '../../models/game-mode';
import { MainScreenFacade } from './main-screen.facade';

@UntilDestroy()
@Component({
  selector: 'app-main-screen',
  standalone: true,
  imports: [CommonModule, NgxQRCodeModule, MainScreenGuessComponent],
  providers: [MainScreenFacade],
  templateUrl: './main-screen.component.html',
  styleUrls: ['./main-screen.component.scss'],
})
export class MainScreenComponent implements OnInit {
  public elementType = 'url' as NgxQrcodeElementTypes;
  public errorCorrection = 'L' as NgxQrcodeErrorCorrectionLevels;
  public gameMode!: GameMode;
  currentGameStatus$!: Observable<GameStatus>;
  GameMode = GameMode;
  GameStatus = GameStatus;

  constructor(
    public sessionService: SessionService,
    private facade: MainScreenFacade,
    public indrawgyHub: IndrawgyHubService
  ) {}

  async ngOnInit(): Promise<void> {
    this.sessionService.createLoginLink();
    this.gameMode = await this.facade.getGameMode();

    this.indrawgyHub.allPlayerReady$
      .pipe(untilDestroyed(this))
      .subscribe((x: boolean) =>
        x ? this.facade.startGameSequence() : this.facade.stopGameSequence()
      );

    this.currentGameStatus$ = this.indrawgyHub.currentGameStatus$;
  }

  async resetGame(samePlayers: boolean) {
    await this.facade.resetGame(samePlayers);
    location.reload();
  }
}
