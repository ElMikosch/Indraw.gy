import { Injectable } from '@angular/core';
import { SendGuessRequestDto } from 'src/app/models/guess';
import { IndrawgyApi } from '../../services/indrawgy.api';

@Injectable()
export class PlayerGuessFacade {
  constructor(private api: IndrawgyApi) {}

  async sendGuess(guess: string): Promise<boolean> {
    return await this.api.post<SendGuessRequestDto, boolean>('sendGuess', {
      guess,
    });
  }
}
