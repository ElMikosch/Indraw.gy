using Microsoft.AspNetCore.SignalR;

namespace Backend.Services
{
    public class DrawService
    {
        private readonly PlayerService playerService;

        public DrawService(PlayerService playerService)
        {
            this.playerService = playerService;
        }

        public void DrawPoint(int x, int y)
        {
           
        }

        public void DrawLine(int fromx, int fromy, int tox, int toy)
        {
        }

    }
}
