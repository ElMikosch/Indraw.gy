using Microsoft.AspNetCore.SignalR;

namespace Backend.Models;

public class Player : Client
{
    public string Username { get; set; }
    public Dictionary<int, string> Pictures { get; set; }
    public int Points { get; set; }
    public bool IsReady { get; set; }
}