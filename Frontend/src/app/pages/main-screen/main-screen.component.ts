import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  NgxQrcodeElementTypes,
  NgxQrcodeErrorCorrectionLevels,
  NgxQRCodeModule,
} from '@techiediaries/ngx-qrcode';
import { SessionService } from 'src/app/services/session.service';
import { MainScreenFacade } from './main-screen.facade';

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

  constructor(
    public sessionService: SessionService,
    private facade: MainScreenFacade
  ) {}

  async ngOnInit(): Promise<void> {
    this.sessionService.createLoginLink();
  }

  async resetGame() {
    await this.facade.resetGame();
    location.reload();
  }
}
