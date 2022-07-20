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

  createNewSessionLink(): void {
    var id = Guid.create();
    var baseUrl = `${window.location.host}/player/register`;
    var absUrl = `${baseUrl}/${id}`;

    console.log(absUrl);

    this.sessionLinkSubject.next(absUrl);
  }
}
