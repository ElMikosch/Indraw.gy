import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'canvas-displays',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './canvas-displays.component.html',
  styleUrls: ['./canvas-displays.component.scss'],
})
export class CanvasDisplaysComponent implements OnInit, AfterViewInit {
  @Input() public timer = 0;

  @ViewChild('playerCanvas') playerCanvas!: ElementRef<HTMLCanvasElement>;

  constructor() {}
  ngAfterViewInit(): void {
    this.playerCanvas.nativeElement.style.width = '100%';
    this.playerCanvas.nativeElement.style.height = '100%';

    this.playerCanvas.nativeElement.width =
      this.playerCanvas.nativeElement.offsetWidth;
    this.playerCanvas.nativeElement.height =
      this.playerCanvas.nativeElement.offsetHeight;
  }

  ngOnInit(): void {}
}
