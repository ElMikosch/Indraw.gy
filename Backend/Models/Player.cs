using Microsoft.AspNetCore.SignalR;

namespace Backend.Models;

public class Player : Client
{
    public string Username { get; set; } = string.Empty;
    public Dictionary<int, string> Pictures { get; set; } = new Dictionary<int, string>();
    public int Points { get; set; }
}