using Backend.Hubs;
using Backend.Models;
using Microsoft.AspNetCore.SignalR;

namespace Backend.Services;

public class PlayerService
{
    private readonly IHubContext<IndrawgyHub> _hubContext;

    private List<Player> Players { get; set; }

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
        if (Players.Count >= 8) throw new Exception("Game is full!");
        if (Players.Any(x => x.SessionId == sessionId)) return;

        var newPlayer = new Player
        {
            Username = username,
            SessionId = sessionId,
            Pictures = new Dictionary<int, string>(),
            Points = 0
        };

        Players.Add(newPlayer);
    }

    public void UpdateConnection(string sessionId, string connectionId, IClientProxy proxy)
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
        }
    }

    public bool PlayerAlreadyInGame(string sessionId)
    {
        var player = Players.FirstOrDefault(x => x.SessionId == sessionId);
        return player != null;
    }

    public void Reset()
    {
        Players = new List<Player>();
    }

    public Player GetPlayerBySessionId(string sessionId)
    {
        return Players.FirstOrDefault(x => x.SessionId == sessionId) ?? throw new InvalidOperationException();
    }
}