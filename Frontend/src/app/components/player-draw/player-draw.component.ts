import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { create } from 'simple-drawing-board';
import { IndrawgyHubService } from 'src/app/hub/indrawgy-hub.service';
import { DrawService } from 'src/app/services/draw.service';
declare var ml5: any;

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
  sessionId!: string;
  classifier: any;

  lastx = 0;
  lasty = 0;

  constructor(
    private drawService: DrawService,
    private hub: IndrawgyHubService
  ) {}

  async ngOnInit(): Promise<void> {
    this.sessionId = sessionStorage.getItem('sessionId') || '';
    this.classifier = await ml5.imageClassifier('DoodleNet');
    console.log('model loaded');
  }

  ngAfterViewInit(): void {
    this.canvas.nativeElement.style.width = '100%';
    this.canvas.nativeElement.style.height = '100%';

    this.canvas.nativeElement.width = this.canvas.nativeElement.offsetWidth;
    this.canvas.nativeElement.height = this.canvas.nativeElement.offsetHeight;

    this.context = this.canvas.nativeElement.getContext('2d')!;
    this.canvastop = this.canvas.nativeElement.offsetTop;

    const sdb = create(this.canvas.nativeElement);
    sdb.setLineColor('black');
    sdb.setLineSize(5);

    sdb.observer.on('draw', async (coords: any) => {
      this.hub.drawLine({
        coordinates: {
          x: coords.x,
          y: coords.y,
        },
        sessionId: this.sessionId,
      });
      const lel = await this.classifier.classify(this.canvas.nativeElement, 3);
      console.log(lel);
    });

    sdb.observer.on('drawBegin', (coords: any) => {
      this.hub.drawPoint({
        coordinates: {
          x: coords.x,
          y: coords.y,
        },
        sessionId: this.sessionId,
      });
    });
  }
}
