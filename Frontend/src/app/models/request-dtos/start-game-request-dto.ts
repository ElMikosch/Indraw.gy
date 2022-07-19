import { GameMode } from '../game-mode';

export type StartGameRequestDto = {
  gameMode: GameMode;
  rounds: number;
};
