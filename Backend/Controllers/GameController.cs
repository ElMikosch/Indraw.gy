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

    [HttpPost("startGame")]
    public IActionResult StartGame([FromBody] StartGameRequestDto startGameRequestDto)
    {
        _gameService.StartGame(startGameRequestDto.GameMode, startGameRequestDto.Rounds);
        return Ok();
    }

    [HttpGet("gameIsRunning")]
    public IActionResult GameIsRunning()
    {
        return Ok(_gameService.GameHasStarted());
    }

    [HttpPost("restartGame")]
    public IActionResult RestartGame()
    {
        return Ok();
    }
}