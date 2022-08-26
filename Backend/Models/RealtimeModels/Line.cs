namespace Backend.Models.RealtimeModels
{
    public class Coordinates
    {
        public double X { get; set; }
        public double Y { get; set; }
    }

    public class DrawInput {
        public Guid SessionId { get; set; }
        public Coordinates Coordinates { get; set; }
    }
}
