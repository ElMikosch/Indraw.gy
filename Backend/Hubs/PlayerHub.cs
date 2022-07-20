using Backend.Services;
using Microsoft.AspNetCore.SignalR;

namespace Backend.Hubs;

public class PlayerHub: Hub
{
    private readonly PlayerService _playerService;

    public PlayerHub(PlayerService playerService)
    {
        _playerService = playerService;
    }

    public override Task OnConnectedAsync()
    {
        return base.OnConnectedAsync();
    }

    public void RegisterPlayer(string sessionId)
    {
        _playerService.UpdateConnection(sessionId, Context.ConnectionId, Clients.Caller);
    }
}