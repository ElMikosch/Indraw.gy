using Microsoft.AspNetCore.SignalR;

namespace Backend.Models
{
    public class Client
    {
        public string SessionId { get; set; }= string.Empty;
        public string ConnectionId { get; set; }= string.Empty;
        public IClientProxy ClientProxy { get; set; } = null!;
    }
}
