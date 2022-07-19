using Microsoft.AspNetCore.SignalR;

namespace Backend.Models;

public class Player
{
    public string SessionId { get; set; }
    public string Username { get; set; }
    public string ConnectionId { get; set; }
    public IClientProxy ClientProxy { get; set; }
    public Dictionary<int, string> Pictures { get; set; }
    public int Points { get; set; }
}