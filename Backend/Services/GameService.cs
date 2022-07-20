using Backend.Models;

namespace Backend.Services;

public class GameService
{
    private GameState GameState { get; set; }

    public GameService()
    {
        GameState = new GameState();
    }

    public void StartGame(GameMode mode, int rounds)
    {
        if (GameState.IsRunning) throw new Exception("Game is already running!");
        GameState = new GameState
        {
            Rounds = rounds,
            GameMode = mode,
            IsRunning = true
        };
    }

    public bool GameIsRunning()
    {
        return GameState.IsRunning;
    }
}