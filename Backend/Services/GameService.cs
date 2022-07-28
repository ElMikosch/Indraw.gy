using Backend.Hubs;
using Backend.Models;
using Microsoft.AspNetCore.SignalR;
using System.Reactive.Linq;
using System.Security.Cryptography.Xml;
using Backend.Extensions;

namespace Backend.Services;

public class GameService
{
    private readonly PlayerService _playerService;
    private readonly IConfiguration _configuration;

    private GameState GameState { get; set; }
    private IDisposable Timer { get; set; }

    public GameService(PlayerService playerService, IConfiguration configuration)
    {
        GameState = new GameState();
        _playerService = playerService;
        _configuration = configuration;
    }

    public void CreateGame(GameMode mode, int rounds, string sessionId)
    {
        if (GameState.GameStatus == GameStatus.Started) throw new Exception("Game is already running!");
        GameState = new GameState
        {
            Rounds = rounds,
            GameMode = mode,
            GameStatus = GameStatus.Created,
        };
        _playerService.MainClient.SessionId = sessionId;
    }

    public async Task StartGame(string sessionId)
    {
        if (GameState.GameStatus == GameStatus.Started) throw new Exception("Game is already running!");
        if (!IsMainClient(sessionId)) throw new Exception("Only the main screen can start the game");
        GameState.GameStatus = GameStatus.Started;

        switch (GameState.GameMode)
        {
            case GameMode.Draw:
                break;
            case GameMode.DrawBr:
                break;
            case GameMode.Guess:
                await SendWordToGuess();
                break;
            default:
                throw new ArgumentOutOfRangeException();
        }
    }

    private async Task SendWordToGuess()
    {
        var randomDoodle = GetRandomDoodleNetEntry();
        GameState.CurrentDoodle = randomDoodle;
        await _playerService.All.SendAsync("WordToGuess", randomDoodle);
    }

    public async Task<bool> GuessWord(string sessionId, string guess)
    {
        if (GameState.FinishedPlayers.Contains(sessionId)) return false;
        var player = _playerService.GetPlayerBySessionId(sessionId);
        var guessCorrect = string.Equals(GameState.CurrentDoodle.Translation, guess,
            StringComparison.CurrentCultureIgnoreCase);

        if (guessCorrect)
        {
            var currentFinishedPlayers = GameState.FinishedPlayers.Count;
            player.Points += currentFinishedPlayers > 0 ? Math.Max(5 - (currentFinishedPlayers + 1), 1) : 5;
            GameState.FinishedPlayers.Add(sessionId);
        }

        GameState.Guesses.Add(new Guess
        {
            Player = player.Username,
            GuessText = guess,
            IsCorrect = guessCorrect
        });

        if (GameState.FinishedPlayers.Count == _playerService.Players.Count)
        {
            await RoundEnd();
        }

        await _playerService.MainClient.ClientProxy.SendAsync("UpdateGuessList", GameState.Guesses);
        return guessCorrect;
    }

    public async Task EndGame(string sessionId)
    {
        if (GameState.GameStatus == GameStatus.Ended) throw new Exception("Game hasn't even started!");
        if (!IsMainClient(sessionId)) throw new Exception("Only the main screen can end the game");
        GameState.GameStatus = GameStatus.Ended;
        await _playerService.All.SendAsync("GameEnded");
    }

    public void ResetGame(string sessionId)
    {
        if (GameState.GameStatus == GameStatus.Started) throw new Exception("Game is already running!");
        if (!IsMainClient(sessionId)) throw new Exception("Only the main screen can reset the game");
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
        return _playerService.MainClient.SessionId == sessionId;
    }

    private DoodleNetEntry GetRandomDoodleNetEntry()
    {
        var entries = _configuration.GetDoodleNetEntries();
        var rnd = new Random();
        var doodleNetEntries = entries as DoodleNetEntry[] ?? entries.ToArray();
        return doodleNetEntries.ToArray()[rnd.Next(0, doodleNetEntries.Length)];
    }

    public async Task StartNextRound(string sessionId)
    {
        if (GameState.GameStatus == GameStatus.Ended) throw new Exception("Game hasn't even started!");
        if (!IsMainClient(sessionId)) throw new Exception("Only the main screen can start the next round");
        if (GameState.CurrentRound >= GameState.Rounds) ResetGame(sessionId);
        const int maxTime = 30;
        GameState.FinishedPlayers = new List<string>();
        GameState.Guesses = new List<Guess>();
        await _playerService.MainClient.ClientProxy.SendAsync("UpdateGuessList", GameState.Guesses);
        await _playerService.All.SendAsync("RoundStart");
        
        
        Timer = Observable.Interval(TimeSpan.FromSeconds(1)).TakeWhile(x => x != maxTime + 1).Subscribe(async timer =>
        {
            await _playerService.MainClient.ClientProxy.SendAsync("TimerUpdate", maxTime - timer);
            if (timer != maxTime) return;
            await RoundEnd();
        });
    }

    private async Task RoundEnd()
    {
        if(Timer != null) Timer.Dispose();
        await _playerService.All.SendAsync("RoundEnd");
        GameState.CurrentRound++;
        await SendWordToGuess();
    }
}