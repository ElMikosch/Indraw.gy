import { Injectable } from '@angular/core';
import { IndrawgyApi } from '../../services/indrawgy.api';
import { GameMode } from '../../models/game-mode';
import { GameStatus } from '../../models/game-status';

@Injectable()
export class PlayerScreenFacade {
  constructor(private api: IndrawgyApi) {}

  public async getGameMode(): Promise<GameMode> {
    return await this.api.get<GameMode>('gameMode');
  }

  public async getGameStatus(): Promise<GameStatus> {
    return await this.api.get<GameStatus>('gameStatus');
  }
}
