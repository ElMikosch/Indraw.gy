import { Injectable } from '@angular/core';
import { IndrawgyApi } from '../../services/indrawgy.api';
import { GameStatus } from '../../models/game-status';
import { GameMode } from '../../models/game-mode';

@Injectable()
export class MainScreenFacade {
  constructor(private api: IndrawgyApi) {}

  public async resetGame() {
    await this.api.post('resetGame', {});
  }

  public async getGameMode(): Promise<GameMode> {
    return await this.api.get<GameMode>('gameMode');
  }
}
