import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { IndrawgyApi } from '../services/indrawgy.api';

@Injectable({
  providedIn: 'root',
})
export class RegisteredPlayerOnlyGuard implements CanActivate {
  constructor(private api: IndrawgyApi, public router: Router) {}

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean | UrlTree> {
    const playerAlreadyInGame = await this.api.get<boolean>(
      'playerAlreadyInGame'
    );
    if (playerAlreadyInGame) return playerAlreadyInGame;
    else return this.router.parseUrl('');
  }
}
