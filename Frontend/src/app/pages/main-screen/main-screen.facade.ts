import { Injectable } from '@angular/core';
import { IndrawgyApi } from '../../services/indrawgy.api';

@Injectable()
export class MainScreenFacade {
  constructor(private api: IndrawgyApi) {}

  public async resetGame() {
    await this.api.post('resetGame', {});
  }

  public async startGameSequence() {
    await this.api.post('beginGameStartSequence', {});
  }

  public async stopGameSequence() {
    await this.api.post('stopGameStartSequence', {});
  }
}
