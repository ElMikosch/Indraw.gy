import { Component } from '@angular/core';
import { Guid } from 'guid-typescript';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor() {
    let sessionId = sessionStorage.getItem('sessionId');

    if (!sessionId) {
      sessionId = Guid.create().toString();
      sessionStorage.setItem('sessionId', sessionId);
    }
  }
}
