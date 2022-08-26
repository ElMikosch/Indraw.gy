import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
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

  constructor(private hub: IndrawgyHubService) {}

  async ngAfterViewInit(): Promise<void> {}
}
