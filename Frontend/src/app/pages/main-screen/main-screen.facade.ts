import { Injectable } from '@angular/core';
import { GameMode } from '../../models/game-mode';
import { IndrawgyApi } from '../../services/indrawgy.api';

@Injectable()
export class MainScreenFacade {
  constructor(private api: IndrawgyApi) {}

  public async resetGame(samePlayers: boolean) {
    await this.api.post('resetGame', { samePlayers });
  }

  public async startGameSequence() {
    await this.api.post('beginGameStartSequence', {});
  }

  public async stopGameSequence() {
    await this.api.post('stopGameStartSequence', {});
  }

  public async getGameMode(): Promise<GameMode> {
    return await this.api.get<GameMode>('gameMode');
  }
}
