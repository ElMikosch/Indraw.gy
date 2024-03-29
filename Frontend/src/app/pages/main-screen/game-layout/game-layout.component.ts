import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IndrawgyHubService } from 'src/app/hub/indrawgy-hub.service';
import { CanvasDisplaysComponent } from './canvas-displays/canvas-displays.component';

@Component({
  selector: 'app-game-layout',
  standalone: true,
  imports: [CommonModule, CanvasDisplaysComponent],
  templateUrl: './game-layout.component.html',
  styleUrls: ['./game-layout.component.scss'],
})
export class GameLayoutComponent implements OnInit {
  constructor(public indrawgyHub: IndrawgyHubService) {}

  ngOnInit(): void {}
}
