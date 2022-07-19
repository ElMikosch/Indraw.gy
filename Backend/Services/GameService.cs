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
        if (GameState.HasStarted) throw new Exception("Game is already running!");
        GameState = new GameState
        {
            Rounds = rounds,
            GameMode = mode,
            HasStarted = true
        };
    }

    public bool GameHasStarted()
    {
        return GameState.HasStarted;
    }
}