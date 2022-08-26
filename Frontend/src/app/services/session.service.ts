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
    const url = `${window.location.origin}/#/login`;
    this.sessionLinkSubject.next(url);
  }
}
