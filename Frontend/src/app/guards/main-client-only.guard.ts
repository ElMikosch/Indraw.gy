import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { IndrawgyApi } from '../services/indrawgy.api';

@Injectable({
  providedIn: 'root',
})
export class MainClientOnlyGuard implements CanActivate {
  constructor(private api: IndrawgyApi, private router: Router) {}

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean | UrlTree> {
    const isMainClient = await this.api.get<boolean>('isMainClient');
    if (isMainClient) return isMainClient;
    else return this.router.parseUrl('');
  }
}
