namespace Backend.Models.RequestDtos;

public class LoginRequestDto
{
    public string Username { get; set; } = string.Empty;

    public bool IsMainClient { get; set; }
}