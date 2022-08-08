using Backend.Extensions;
using Backend.Models;
using Backend.Models.RequestDtos;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;

public class LoginController: BaseController
{
    private readonly GameService _gameService;
    private readonly PlayerService _playerService;

    public LoginController(GameService gameService, PlayerService playerService)
    {
        _gameService = gameService;
        _playerService = playerService;
    }

    [HttpPost]
    public IActionResult Login([FromBody] LoginRequestDto loginRequestDto)
    {
        if (_gameService.GameHasStarted()) return BadRequest("Game already started!");
        if(!_gameService.GameIsCreated()) return BadRequest("There is currently no active game");
        var sessionId = Request.GetSessionId();
        if (loginRequestDto.IsMainClient)
        {
            _playerService.RegisterMainClient(sessionId);
        }
        else
        {

            _playerService.TryAddPlayer(sessionId, loginRequestDto.Username);
        }
        
        return Ok();
    }

    [HttpGet("playerAlreadyInGame")]
    public IActionResult PlayerAlreadyInGame()
    {
        var sessionId = Request.GetSessionId();
        return Ok(_playerService.PlayerAlreadyInGame(sessionId));
    }
}