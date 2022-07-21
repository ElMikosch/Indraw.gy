import { Injectable } from '@angular/core';
import { IndrawgyApi } from '../../services/indrawgy.api';

@Injectable()
export class PlayerGuessFacade {
  constructor(private api: IndrawgyApi) {}

  async sendGuess(guess: string): Promise<boolean> {
    return await this.api.post<string, boolean>('createGame', guess);
  }
}
