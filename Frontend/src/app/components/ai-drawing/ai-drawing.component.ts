import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';
import { IndrawgyHubService } from 'src/app/hub/indrawgy-hub.service';
import { DoodleNetEntry } from 'src/app/models/doodle-net-entry';

declare var ml5: any;

@Component({
  selector: 'app-ai-drawing',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ai-drawing.component.html',
  styleUrls: ['./ai-drawing.component.scss'],
})
@UntilDestroy()
export class AiDrawingComponent implements AfterViewInit {
  @ViewChild('canvas', { static: false })
  canvas!: ElementRef<HTMLCanvasElement>;

  @Input() doodleKey!: string;
  @Input() doodleNetEntry$!: Observable<DoodleNetEntry>;

  public context!: CanvasRenderingContext2D | null;

  private strokePath!: any;
  private previousPen = 'down';
  private x = 0;
  private y = 0;

  private model!: any;

  constructor(private hub: IndrawgyHubService) {}

  generatePicture() {
    this.model.reset();
    this.context?.clearRect(
      0,
      0,
      this.canvas.nativeElement.width,
      this.canvas.nativeElement.height
    );
    this.model.generate((err: any, result: any) => {
      this.strokePath = result;
      this.x = this.canvas.nativeElement.width / 2;
      this.y = this.canvas.nativeElement.height / 2;
      this.draw();
    });
  }

  async ngAfterViewInit(): Promise<void> {
    this.context = this.canvas.nativeElement.getContext('2d');
    this.context!.lineWidth = 5;
    this.hub.wordToGuess$
      .pipe(untilDestroyed(this))
      .subscribe(async (doodleNetEntry) => {
        this.model = await ml5.sketchRNN(doodleNetEntry.key);
        setTimeout(async () => {
          await this.hub.startRound();
          this.generatePicture();
        }, 5000);
      });
  }

  draw() {
    if (this.strokePath) {
      if (this.previousPen == 'down') {
        this.context?.beginPath();
        this.context?.moveTo(this.x, this.y);
        this.context?.lineTo(
          this.x + this.strokePath.dx,
          this.y + this.strokePath.dy
        );
        this.context?.stroke();
      }

      this.x += this.strokePath.dx;
      this.y += this.strokePath.dy;
      this.previousPen = this.strokePath.pen;
      if (this.strokePath && this.strokePath.pen !== 'end') {
        this.strokePath = null;
        this.model.generate((err: any, result: any) => {
          this.strokePath = result;
          window.requestAnimationFrame(this.draw.bind(this));
        });
      }
      if (this.strokePath && this.strokePath.pen === 'end') {
        setTimeout(() => this.generatePicture(), 1000);
      }
    }
  }
}
