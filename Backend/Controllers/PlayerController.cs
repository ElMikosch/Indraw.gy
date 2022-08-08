using Backend.Extensions;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    public class PlayerController : BaseController
    {
        private readonly PlayerService playerService;

        public PlayerController(PlayerService playerService)
        {
            this.playerService = playerService;
        }

        [HttpPost("changePlayerReadyState")]
        public void ChangePlayerReadyState([FromBody] bool ready)
        {
            var sessionId = Request.GetSessionId();
            this.playerService.SetPlayersReadyState(sessionId, ready);

        }
    }
}
