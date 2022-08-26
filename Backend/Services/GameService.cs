using Backend.Hubs;
using Backend.Models;
using Microsoft.AspNetCore.SignalR;
using System.Reactive.Linq;
using System.Security.Cryptography.Xml;
using Backend.Extensions;

namespace Backend.Services;

/// <summary>
/// Fullfill the GameService!
/// There are methods that are not yet implemented.
/// In every of these methods you need to send at least one message to the client via SignalR.
/// The PlayerService should help with the list of player and the mainClient
/// You don't need to implement any error handling, but in some methods its required to check if the mainClient is calling the method!
/// Also, have a look into the frontend, where you find all observables to call :)
/// </summary>

public class GameService
{
    private readonly PlayerService _playerService;
    private readonly IConfiguration _configuration;

    private GameState GameState { get; set; }
    private IDisposable Timer { get; set; }
    private bool StartSequenceStopped;
    private bool StartSequenceStarted;

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
        SetGameStatus(GameStatus.Started);

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
        //Send a random doodle 
        //Use method GetRandomDoodleNetEntry()
    }

    public async Task<bool> GuessWord(string sessionId, string guess)
    {
        //Implement GuessWord logic
        //When the player guesses correctly he gets points like this:
        //1st Place = 5 Points
        //2nd Place = 3 Points
        //3rd Place = 2 Points
        //Correct Guess inside time frame = 1 Point
        //If all players are finished the round should end

        return true;
    }

    public async Task EndGame(string sessionId)
    {
        //Implement GameEnd logic
        //Use setGameMode to update the GameMode
    }

    public void ResetGame(string sessionId, bool samePlayers)
    {
        if (!IsMainClient(sessionId)) throw new Exception("Only the main screen can reset the game");
        if (samePlayers)
        {
            SetGameStatus(GameStatus.Created);
            GameState.CurrentDoodle = new();
            GameState.CurrentRound = 1;
            GameState.FinishedPlayers = new List<string>();
            GameState.Guesses = new List<Guess>();
        }
        else
        {
            SetGameStatus(GameStatus.Open);
            GameState = new GameState();

        }
    }

    public GameStatus GetGameStatus()
    {
        return GameState.GameStatus;
    }

    public GameMode GetGameMode()
    {
        return GameState.GameMode;
    }

    public void SetGameStatus(GameStatus gameStatus)
    {
        GameState.GameStatus = gameStatus;
        _playerService.All.SendAsync("CurrentGameStatus", GameState.GameStatus);
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
        //Implement StartNextRound logic
        //Timer should be 30 seconds for each round
        //Use GameState to save finishedPlayers and all Guesses
        //When timer ends, the round should end 
    }

    private async Task RoundEnd()
    {
        if (Timer != null) Timer.Dispose();
        await _playerService.All.SendAsync("RoundEnd");
        GameState.Guesses.Add(new Guess { GuessText = GameState.CurrentDoodle.Translation, IsCorrect = false, Player = "Richtiges Wort" });
        await _playerService.MainClient.ClientProxy.SendAsync("UpdateGuessList", GameState.Guesses);
        GameState.CurrentRound++;
        await SendWordToGuess();
    }

    public void BeginGameStartSequence(string sessionId)
    {
        //Implement the game start sequence 
        //The sequence should last 10 seconds before the actual game starts
        //When StartSequenceStopped is true, the timer should be stopped/disposed
        //The game status is "Starting
    }

    public void CancelGameStartSequence(string sessionId)
    {
        if (!IsMainClient(sessionId)) throw new Exception("You're not allowed to stop the game start sequence");
         if(GameState.GameStatus != GameStatus.Starting) return;
        StartSequenceStopped = true;
        SetGameStatus(GameStatus.Created);
    }

    public async Task SendInitialValues()
    {
        await _playerService.All.SendAsync("CurrentGameStatus", GameState.GameStatus);
        if(!string.IsNullOrEmpty(GameState.CurrentDoodle.Key))
          await _playerService.All.SendAsync("WordToGuess", GameState.CurrentDoodle);
    }
}