using Backend.Models;

namespace Backend.Services;

public class GameService
{
    private GameState GameState { get; set; }

    public GameService()
    {
        GameState = new GameState();
    }

    public void CreateGame(GameMode mode, int rounds, string sessionId)
    {
        if (GameState.GameStatus == GameStatus.Started) throw new Exception("Game is already running!");
        GameState = new GameState
        {
            Rounds = rounds,
            GameMode = mode,
            GameStatus = GameStatus.Created,
            MainSessionId = sessionId
        };
    }

    public void StartGame(string sessionId)
    {
        if (GameState.GameStatus == GameStatus.Started) throw new Exception("Game is already running!");
        if (GameState.MainSessionId != sessionId) throw new Exception("Only the main screen can start the game");
        GameState.GameStatus = GameStatus.Started;
    }

    public GameStatus GetGameStatus()
    {
        return GameState.GameStatus;
    }

    public bool GameHasStarted()
    {
        return GameState.GameStatus == GameStatus.Started;
    }

    public bool GameIsCreated()
    {
        return GameState.GameStatus == GameStatus.Created;
    }

    public bool IsMainClient(string sessionId)
    {
        return GameState.MainSessionId == sessionId;
    }
}