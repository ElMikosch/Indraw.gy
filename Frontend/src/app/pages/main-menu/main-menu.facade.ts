import { Injectable } from '@angular/core';
import { GameMode } from 'src/app/models/game-mode';
import { GameStatus } from 'src/app/models/game-status';
import { StartGameRequestDto } from 'src/app/models/request-dtos/start-game-request-dto';
import { IndrawgyApi } from 'src/app/services/indrawgy.api';

@Injectable()
export class MainMenuFacade {
  constructor(private api: IndrawgyApi) {}

  public async createGame(gameMode: GameMode, rounds: number) {
    return await this.api.post<StartGameRequestDto, unknown>('createGame', {
      gameMode,
      rounds,
    });
  }
}
