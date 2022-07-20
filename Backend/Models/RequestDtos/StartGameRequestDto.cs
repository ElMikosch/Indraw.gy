namespace Backend.Models.RequestDtos;

public class StartGameRequestDto
{
    public GameMode GameMode { get; set; }
    public int Rounds { get; set; }
}