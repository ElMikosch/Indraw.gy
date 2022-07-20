import { Injectable } from '@angular/core';
import { Guid } from 'guid-typescript';
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

  createLoginLink(): void{
    const url = `${window.location.origin}/login`;
    console.log(url);
    this.sessionLinkSubject.next(url);
  }

  createNewSessionLink(): void {
    const id = Guid.create();
    const baseUrl = `${window.location.origin}/player/register`;
    const absUrl = `${baseUrl}/${id}`;

    console.log(absUrl);

    this.sessionLinkSubject.next(absUrl);
  }
}
