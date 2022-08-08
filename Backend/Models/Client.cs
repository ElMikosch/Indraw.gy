using Microsoft.AspNetCore.SignalR;

namespace Backend.Models
{
    public class Client
    {
        public string SessionId { get; set; }
        public string ConnectionId { get; set; }
        public IClientProxy ClientProxy { get; set; }
    }
}
