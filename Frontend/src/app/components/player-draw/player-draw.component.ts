import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { create } from 'simple-drawing-board';
import { IndrawgyHubService } from 'src/app/hub/indrawgy-hub.service';
import { DrawService } from 'src/app/services/draw.service';

@Component({
  selector: 'app-player-draw',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './player-draw.component.html',
  styleUrls: ['./player-draw.component.scss'],
})
export class PlayerDrawComponent implements OnInit {
  @ViewChild('canvas') canvas!: ElementRef<HTMLCanvasElement>;

  context!: CanvasRenderingContext2D;
  canvastop!: number;

  lastx = 0;
  lasty = 0;

  constructor(
    private drawService: DrawService,
    private hub: IndrawgyHubService
  ) {}

  ngOnInit(): void {
    const sdb = create(this.canvas.nativeElement);
    sdb.setLineColor('red');
  }

  ngAfterViewInit(): void {
    this.canvas.nativeElement.style.width = '100%';
    this.canvas.nativeElement.style.height = '100%';

    this.canvas.nativeElement.width = this.canvas.nativeElement.offsetWidth;
    this.canvas.nativeElement.height = this.canvas.nativeElement.offsetHeight;

    this.context = this.canvas.nativeElement.getContext('2d')!;
    this.canvastop = this.canvas.nativeElement.offsetTop;

    this.context.strokeStyle = '#000000';
    this.context.lineCap = 'round';
    this.context.lineJoin = 'round';
    this.context.lineWidth = 5;

    this.canvas.nativeElement.ontouchmove = (e: TouchEvent) => {
      e.preventDefault();

      var newx = e.touches[0].clientX;
      var newy = e.touches[0].clientY - this.canvastop;

      this.drawService.line(this.context, {
        fromx: this.lastx,
        fromy: this.lasty,
        tox: newx,
        toy: newy,
      });
      this.hub.drawLine({
        x: newx,
        y: newy,
      });
      this.lastx = newx;
      this.lasty = newy;
    };

    this.canvas.nativeElement.ontouchstart = (e: TouchEvent) => {
      e.preventDefault();

      this.lastx = e.touches[0].clientX;
      this.lasty = e.touches[0].clientY - this.canvastop;

      this.drawService.dot(this.context, { x: this.lastx, y: this.lasty });
      this.hub.drawPoint({ x: e.touches[0].clientX, y: e.touches[0].clientY });
    };
  }
}
