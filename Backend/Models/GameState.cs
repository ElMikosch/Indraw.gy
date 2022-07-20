namespace Backend.Models;

public class GameState
{
    public GameMode GameMode { get; set; }
    public int Rounds { get; set; }
    public GameStatus GameStatus { get; set; } = GameStatus.Open;
    public string MainSessionId { get; set; }
}