using Backend.Extensions;
using Backend.Models.RequestDtos;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.JSInterop.Infrastructure;

namespace Backend.Controllers;

public class GuessController : BaseController
{
    private readonly GameService _gameService;

    public GuessController(GameService gameService)
    {
        _gameService = gameService;
    }

    [HttpPost("sendGuess")]
    public async Task<IActionResult> SendGuess(SendGuessRequestDto dto)
    {
        return Ok(await _gameService.GuessWord(Request.GetSessionId(), dto.Guess));
    }
}