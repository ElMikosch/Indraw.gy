import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'canvas-displays',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './canvas-displays.component.html',
  styleUrls: ['./canvas-displays.component.scss'],
})
export class CanvasDisplaysComponent implements OnInit {
  @Input() public timer = 0;

  constructor() {}

  ngOnInit(): void {}
}
