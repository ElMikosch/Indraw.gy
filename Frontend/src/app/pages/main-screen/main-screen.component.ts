import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  NgxQrcodeElementTypes,
  NgxQrcodeErrorCorrectionLevels,
  NgxQRCodeModule,
} from '@techiediaries/ngx-qrcode';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-main-screen',
  standalone: true,
  imports: [CommonModule, NgxQRCodeModule],
  templateUrl: './main-screen.component.html',
  styleUrls: ['./main-screen.component.scss'],
})
export class MainScreenComponent implements OnInit {
  public elementType = 'url' as NgxQrcodeElementTypes;
  public errorCorrection = 'L' as NgxQrcodeErrorCorrectionLevels;

  constructor(public sessionService: SessionService) {}

  ngOnInit(): void {}
}
