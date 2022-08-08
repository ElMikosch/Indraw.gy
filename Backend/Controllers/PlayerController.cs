using Backend.Extensions;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    public class PlayerController : BaseController
    {
        private readonly PlayerService _playerService;

        public PlayerController(PlayerService playerService)
        {
            _playerService = playerService;
        }

        [HttpPost("changePlayerReadyState")]
        public void ChangePlayerReadyState([FromBody] bool ready)
        {
            var sessionId = Request.GetSessionId();
            _playerService.SetPlayersReadyState(sessionId, ready);

        }
    }
}
