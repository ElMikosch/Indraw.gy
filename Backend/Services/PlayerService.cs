using Backend.Hubs;
using Backend.Models;
using Microsoft.AspNetCore.SignalR;
using System.Reactive;
using System.Reactive.Linq;

namespace Backend.Services;

public class PlayerService
{
    private readonly IHubContext<IndrawgyHub> _hubContext;

    public List<Player> Players { get; set; }

    public MainClient MainClient { get; set; }

    public IClientProxy All => _hubContext.Clients.All;

    public PlayerService(IHubContext<IndrawgyHub> hubContext)
    {
        Players = new List<Player>();
        MainClient = new MainClient();
        _hubContext = hubContext;
    }

    public void TryAddPlayer(string sessionId, string username)
    {
        if (Players.Count >= 4) throw new Exception("Game is full!");
        if (Players.Any(x => x.SessionId == sessionId)) return;

        var newPlayer = new Player
        {
            Username = username,
            SessionId = sessionId,
            Pictures = new Dictionary<int, string>(),
            Points = 0
        };

        Players.Add(newPlayer);
        MainClient.ClientProxy.SendAsync("PlayerUpdate", Players);
    }

    public async Task UpdateConnection(string sessionId, string connectionId, IClientProxy proxy)
    {
        var player = Players.FirstOrDefault(x => x.SessionId == sessionId);
        if (player != null)
        {
            player.ConnectionId = connectionId;
            player.ClientProxy = proxy;
        }
        else if (MainClient.SessionId == sessionId)
        {
            MainClient.ClientProxy = proxy;
            MainClient.ConnectionId = connectionId;
            await SendInitialValues();
        }

        if (MainClient.ClientProxy != null)
            await MainClient.ClientProxy.SendAsync("PlayerUpdate", Players);
    }

    public bool PlayerAlreadyInGame(string sessionId)
    {
        var player = Players.FirstOrDefault(x => x.SessionId == sessionId);
        return player != null;
    }

    public async Task Reset(bool samePlayers)
    {
        if (!samePlayers) {
            Players = new List<Player>();
            MainClient = new MainClient();
            await All.SendAsync("ResetGame");
        }
        else
        {
            Players.ForEach(p =>
            {
                p.IsReady = false;
                p.Pictures = new Dictionary<int, string>();
                p.Points = 0;
            });
        }
    }

    public Player GetPlayerBySessionId(string sessionId)
    {
        return Players.FirstOrDefault(x => x.SessionId == sessionId) ?? throw new InvalidOperationException();
    }

    public void SetPlayersReadyState(string sessionId, bool ready)
    {
        var player = Players.FirstOrDefault(x => x.SessionId == sessionId);
        if (player == null) throw new Exception("You're not logged into the game");
        player.IsReady = ready;
        MainClient.ClientProxy.SendAsync("PlayerUpdate", Players);
        MainClient.ClientProxy.SendAsync("AllPlayerReady", Players.All(x => x.IsReady));
    }

    private async Task SendInitialValues()
    {
        await MainClient.ClientProxy.SendAsync("PlayerUpdate", Players);
    }
}