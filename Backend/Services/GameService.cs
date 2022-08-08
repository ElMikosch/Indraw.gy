using Backend.Models;

namespace Backend.Services;

public class GameService
{
    private GameState GameState { get; set; }
    private bool StartSequenceStopped;
    private bool StartSequenceStarted;

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
        SetGameStatus(GameStatus.Started);
        var maxTime = 60;
        Observable.Interval(TimeSpan.FromSeconds(1)).TakeWhile(x => x != maxTime + 1 && GameState.GameStatus == GameStatus.Started).Subscribe(async timer =>
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
        SetGameStatus(GameStatus.Ended);
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

    public void SetGameStatus(GameStatus gameStatus)
    {
        GameState.GameStatus = gameStatus;
        this.playerService.All.ForEach(x => x.ClientProxy.SendAsync("CurrentGameStatus", GameState.GameStatus));
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

    public void BeginGameStartSequence(string sessionId)
    {
        //if(playerService.Players.Count < 2)
        //{
        //    return;
        //}
        var startSequenceTime = 10;
        StartSequenceStopped = false;
        SetGameStatus(GameStatus.Starting);
        Observable.Interval(TimeSpan.FromSeconds(1)).TakeWhile(x =>
        {
            return x != startSequenceTime + 1 && !StartSequenceStopped;
        }).Subscribe(async timer =>
        {
            await playerService.MainClient.ClientProxy.SendAsync("StartSequenceTimer", startSequenceTime - timer);
            if (timer == startSequenceTime)
            {
                StartGame(sessionId);
            }
        });
    }

    public void CancelGameStartSequence(string sessionId)
    {
        if (!IsMainClient(sessionId)) throw new Exception("You're not allowed to stop the game start sequence");
        StartSequenceStopped = true;
        SetGameStatus(GameStatus.Open);
    }
}