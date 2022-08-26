﻿using Backend.Models.RealtimeModels;
using Backend.Services;
using Microsoft.AspNetCore.SignalR;

namespace Backend.Hubs
{
    public class IndrawgyHub : Hub
    {
        private readonly PlayerService _playerService;
        private readonly GameService _gameService;

        public IndrawgyHub(PlayerService playerService, GameService gameService)
        {
            _playerService = playerService;
            _gameService = gameService;
        }

        public async Task Register(string sessionId)
        {
            await _playerService.UpdateConnection(sessionId, Context.ConnectionId, Clients.Caller);
            await _gameService.SendInitialValues();
        }

        public async Task StartRound(string sessionId)
        {
            await _gameService.StartNextRound(sessionId);
        }

        public void BeginGameStartSequence(string sessionId)
        {
            _gameService.BeginGameStartSequence(sessionId);
        }
    }
}
