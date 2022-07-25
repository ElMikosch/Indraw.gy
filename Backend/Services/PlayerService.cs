﻿using Backend.Hubs;
using Backend.Models;
using Microsoft.AspNetCore.SignalR;

namespace Backend.Services;

public class PlayerService
{
    private List<Player> _players;
    private MainClient _mainClient;
    private List<Client> _clients;
    private readonly IHubContext<IndrawgyHub> hubContext;

    public List<Player> Players { get => _players; set => _players = value; }
    public MainClient MainClient { get => _mainClient; set => _mainClient = value; }
    public List<Client> All { get => new List<Client> { MainClient }.Concat(Players).ToList(); }

    public PlayerService(IHubContext<IndrawgyHub> hubContext)
    {
        Players = new List<Player>();
        this.hubContext = hubContext;
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
        if (player == null) return;
        player.ConnectionId = connectionId;
        player.ClientProxy = proxy;

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

    public void RegisterMainClient(string sessionId)
    {
        MainClient = new MainClient
        {
            SessionId = sessionId
        };
    }


    public void UpdateMainClientConnection(string sessionId, string connectionId, IClientProxy proxy)
    {
        MainClient.SessionId = sessionId;
        MainClient.ConnectionId = connectionId;
        MainClient.ClientProxy = proxy;
    }
}