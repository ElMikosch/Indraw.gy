using Backend.Extensions;
using Backend.Models;
using Backend.Models.RequestDtos;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;

public class GameController : BaseController
{
    private readonly GameService _gameService;
    private readonly PlayerService _playerService;

    public GameController(GameService gameService, PlayerService playerService)
    {
        _gameService = gameService;
        _playerService = playerService;
    }

    [HttpPost("createGame")]
    public IActionResult CreateGame([FromBody] StartGameRequestDto startGameRequestDto)
    {
        _gameService.CreateGame(startGameRequestDto.GameMode, startGameRequestDto.Rounds, Request.GetSessionId());
        return Ok();
    }

    [HttpPost("startGame")]
    public async Task<IActionResult> StartGame()
    {
        await _gameService.StartGame(Request.GetSessionId());
        return Ok();
    }

    [HttpGet("gameStatus")]
    public IActionResult GetGameStatus()
    {
        return Ok(_gameService.GetGameStatus());
    }

    [HttpGet("gameMode")]
    public IActionResult GetGameMode()
    {
        return Ok(_gameService.GetGameMode());
    }

    [HttpGet("isMainClient")]
    public IActionResult IsMainClient()
    {
        return Ok(_gameService.IsMainClient(Request.GetSessionId()));
    }

    [HttpPost("resetGame")]
    public IActionResult ResetGame()
    {
        _gameService.ResetGame(Request.GetSessionId());
        _playerService.Reset();
        return Ok();
    }
}