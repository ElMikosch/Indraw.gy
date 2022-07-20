import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SessionService } from './services/session.service';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [HttpClientModule, FormsModule, CommonModule, RouterModule],
})
export class AppComponent implements OnInit {
  constructor(private sessionService: SessionService) {}

  ngOnInit(): void {
    console.log('kek');
    this.sessionService.createNewSessionLink();
  }
}
