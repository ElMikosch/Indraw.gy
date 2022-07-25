using Backend.Services;
using Microsoft.AspNetCore.SignalR;

namespace Backend.Hubs
{
    public class IndrawgyHub : Hub
    {
        private readonly PlayerService _playerService;

        public IndrawgyHub(PlayerService playerService)
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

        public void RegisterMainClient(string sessionId)
        {
            _playerService.UpdateMainClientConnection(sessionId, Context.ConnectionId, Clients.Caller);
        }
    }
}
