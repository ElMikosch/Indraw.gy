import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { IndrawgyHubService } from 'src/app/hub/indrawgy-hub.service';
import { DrawService } from 'src/app/services/draw.service';
@UntilDestroy()
@Component({
  selector: 'canvas-displays',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './canvas-displays.component.html',
  styleUrls: ['./canvas-displays.component.scss'],
})
export class CanvasDisplaysComponent implements OnInit, AfterViewInit {
  @Input() username!: string;
  @Input() isPlayerReady = false;
  @Input() sessionId!: string;

  @ViewChild('playerCanvas') playerCanvas!: ElementRef<HTMLCanvasElement>;

  context!: CanvasRenderingContext2D;
  canvastop!: number;
  lastx = 0;
  lasty = 0;

  constructor(
    private drawService: DrawService,
    private hub: IndrawgyHubService
  ) {}
  ngAfterViewInit(): void {
    this.context = this.playerCanvas.nativeElement.getContext('2d')!;
    this.canvastop = this.playerCanvas.nativeElement.offsetTop;

    this.context.strokeStyle = '#000000';
    this.context.lineCap = 'round';
    this.context.lineJoin = 'round';
    this.context.lineWidth = 5;

    this.hub.drawLineOnMainClient$
      .pipe(untilDestroyed(this))
      .subscribe((input) => {
        if (input.sessionId !== this.sessionId) return;
        const newx = input.coordinates.x;
        const newy = input.coordinates.y;

        this.drawService.line(this.context, {
          fromx: this.lastx,
          fromy: this.lasty,
          tox: newx,
          toy: newy,
        });
        this.lastx = newx;
        this.lasty = newy;
      });

    this.hub.drawPointOnMainClient$
      .pipe(untilDestroyed(this))
      .subscribe((input) => {
        if (input.sessionId !== this.sessionId) return;
        this.lastx = input.coordinates.x;
        this.lasty = input.coordinates.y;

        this.drawService.dot(this.context, { x: this.lastx, y: this.lasty });
      });
  }

  ngOnInit(): void {}
}
