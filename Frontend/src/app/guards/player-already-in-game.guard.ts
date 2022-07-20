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
export class PlayerAlreadyInGameGuard implements CanActivate {
  constructor(private api: IndrawgyApi, private router: Router) {}

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean | UrlTree> {
    const playerAlreadyInGame = await this.api.get('playerAlreadyInGame');
    if (playerAlreadyInGame) return this.router.parseUrl('/player');
    else return true;
  }
}
