import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  weather$!: Observable<any[]>;

  constructor(httpClient: HttpClient) {
    this.weather$ = httpClient.get<any[]>('/api/weatherforecast');
  }
}
