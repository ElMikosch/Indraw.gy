import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  sessionLink$: Observable<string>;
  private sessionLinkSubject = new ReplaySubject<string>();

  constructor() {
    this.sessionLink$ = this.sessionLinkSubject.asObservable();
  }

  createLoginLink(): void {
    const url = `http://192.168.178.81:4200/#/login`;
    console.log(url);
    this.sessionLinkSubject.next(url);
  }
}
