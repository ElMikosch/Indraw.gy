import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { IndrawgyApi } from '../services/indrawgy.api';
import { GameStatus } from '../models/game-status';

@Injectable({
  providedIn: 'root',
})
export class MainMenuGuard implements CanActivate {
  constructor(private api: IndrawgyApi, private router: Router) {}

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean | UrlTree> {
    const gameStatus = await this.api.get<GameStatus>('gameStatus');
    const isMainClient = await this.api.get<boolean>('isMainClient');
    if (this.isGameStartedOrCreated(gameStatus) && isMainClient)
      return this.router.parseUrl('/game');
    if (this.isGameStartedOrCreated(gameStatus) && !isMainClient)
      return this.router.parseUrl('/login');

    return true;
  }

  private isGameStartedOrCreated(gameStatus: GameStatus): boolean {
    return (
      gameStatus === GameStatus.created || gameStatus === GameStatus.started
    );
  }
}
