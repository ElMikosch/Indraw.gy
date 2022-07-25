namespace Backend.Models;

public class DoodleNetEntry
{
    public string Key { get; set; } = string.Empty;
    public string Translation { get; set; } = string.Empty;
}

public class Guess
{
    public string GuessText { get; set; } = string.Empty;
    public string Player { get; set; } = string.Empty;
    public bool IsCorrect { get; set; }
}