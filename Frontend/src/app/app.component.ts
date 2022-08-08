import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Guid } from 'guid-typescript';
import { IndrawgyHubService } from './hub/indrawgy-hub.service';
@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [HttpClientModule, FormsModule, CommonModule, RouterModule],
})
export class AppComponent {
  constructor(private indrawgyHub: IndrawgyHubService) {
    let sessionId = sessionStorage.getItem('sessionId');

    if (!sessionId) {
      sessionId = Guid.create().toString();
      sessionStorage.setItem('sessionId', sessionId);
    }

    this.indrawgyHub.connect();
  }
}
