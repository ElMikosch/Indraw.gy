import { Injectable } from '@angular/core';
import { GameMode } from 'src/app/models/game-mode';
import { StartGameRequestDto } from 'src/app/models/request-dtos/start-game-request-dto';
import { IndrawgyApi } from 'src/app/services/indrawgy.api';

@Injectable()
export class MainMenuFacade {
  constructor(private api: IndrawgyApi) {}

  public async gameIsRunning(): Promise<boolean> {
    return await this.api.get<boolean>('gameIsRunning');
  }

  public async startGame(gameMode: GameMode, rounds: number) {
    return await this.api.post<StartGameRequestDto, unknown>('startGame', {
      gameMode,
      rounds,
    });
  }
}
