namespace Backend.Models.RequestDtos;

public class LoginRequestDto
{
    public string Username { get; set; }

    public bool IsMainClient { get; set; }
}