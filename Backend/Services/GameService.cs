using Backend.Hubs;
using Backend.Models;
using Microsoft.AspNetCore.SignalR;
using System.Reactive.Linq;

namespace Backend.Services;

public class GameService
{
    private readonly PlayerService playerService;

    private GameState GameState { get; set; }

    public GameService(PlayerService playerService)
    {
        this.GameState = new GameState();
        this.playerService = playerService;
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
        var maxTime = 60;
        Observable.Interval(TimeSpan.FromSeconds(1)).TakeWhile(x => x != maxTime + 1).Subscribe(async timer =>
        {

            await playerService.MainClient.ClientProxy.SendAsync("TimerUpdate", maxTime - timer);
            if (timer == maxTime)
            {
                EndGame(sessionId);
                return;
            }
        });
    }

    public void EndGame(string sessionId)
    {
        if (GameState.GameStatus == GameStatus.Ended) throw new Exception("Game hasn't even started!");
        if (GameState.MainSessionId != sessionId) throw new Exception("Only the main screen can end the game");
        GameState.GameStatus = GameStatus.Ended;
        playerService.All.ForEach(client => client.ClientProxy.SendAsync("gameEnded"));
    }

    public void ResetGame(string sessionId)
    {
        if (GameState.GameStatus == GameStatus.Started) throw new Exception("Game is already running!");
        if (GameState.MainSessionId != sessionId) throw new Exception("Only the main screen can reset the game");
        GameState = new GameState();
    }

    public GameStatus GetGameStatus()
    {
        return GameState.GameStatus;
    }

    public GameMode GetGameMode()
    {
        return GameState.GameMode;
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