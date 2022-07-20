using Backend.Extensions;
using Backend.Models.RequestDtos;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;

public class GameController : BaseController
{
    private readonly GameService _gameService;

    public GameController(GameService gameService)
    {
        _gameService = gameService;
    }

    [HttpPost("createGame")]
    public IActionResult CreateGame([FromBody] StartGameRequestDto startGameRequestDto)
    {
        _gameService.CreateGame(startGameRequestDto.GameMode, startGameRequestDto.Rounds, Request.GetSessionId());
        return Ok();
    }
    
    [HttpPost("startGame")]
    public IActionResult StartGame()
    {
        _gameService.StartGame(Request.GetSessionId());
        return Ok();
    }

    [HttpGet("gameStatus")]
    public IActionResult GetGameStatus()
    {
        return Ok(_gameService.GetGameStatus());
    }

    [HttpGet("isMainClient")]
    public IActionResult IsMainClient()
    {
        return Ok(_gameService.IsMainClient(Request.GetSessionId()));
    }

    [HttpPost("restartGame")]
    public IActionResult RestartGame()
    {
        return Ok();
    }
}