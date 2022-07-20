using Backend.Models;
using Microsoft.AspNetCore.SignalR;

namespace Backend.Services;

public class PlayerService
{
    private readonly List<Player> _players;

    public PlayerService()
    {
        _players = new List<Player>();
    }

    public void TryAddPlayer(string sessionId, string username)
    {
        if (_players.Count >= 8) throw new Exception("Game is full!");
        if (_players.Any(x => x.SessionId == sessionId)) return;

        _players.Add(new Player
        {
            Username = username,
            SessionId = sessionId,
            Pictures = new Dictionary<int, string>(),
            Points = 0
        });
    }

    public void UpdateConnection(string sessionId, string connectionId, IClientProxy proxy)
    {
        var player = _players.FirstOrDefault(x => x.SessionId == sessionId);
        if (player == null) return;
        player.ConnectionId = connectionId;
        player.ClientProxy = proxy;
    }

    public bool PlayerAlreadyInGame(string sessionId)
    {
        var player = _players.FirstOrDefault(x => x.SessionId == sessionId);
        return player != null;
    }
}