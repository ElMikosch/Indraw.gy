import { Injectable } from '@angular/core';
import { GameMode } from '../../models/game-mode';
import { IndrawgyApi } from '../../services/indrawgy.api';

@Injectable()
export class MainScreenFacade {
  constructor(private api: IndrawgyApi) {}

  public async resetGame() {
    await this.api.post('resetGame', {});
  }

  public async startGame() {
    await this.api.post('startGame', {});
  }
}
