namespace Backend.Models;

public class GameState
{
    public GameMode GameMode { get; set; }
    public int Rounds { get; set; }
    public int CurrentRound { get; set; } = 1;
    public List<string> FinishedPlayers { get; set; } = new();
    public List<Guess> Guesses { get; set; } = new();
    public DoodleNetEntry CurrentDoodle { get; set; } = new();
    public GameStatus GameStatus { get; set; } = GameStatus.Open;
}