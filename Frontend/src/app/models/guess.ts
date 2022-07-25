export type Guess = {
  guessText: string;
  player: string;
  isCorrect: boolean;
};

export type SendGuessRequestDto = {
  guess: string;
};
