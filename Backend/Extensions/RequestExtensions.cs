namespace Backend.Extensions;

public static class RequestExtensions
{
    public static string GetSessionId(this HttpRequest httpRequest)
    {
        return httpRequest.Headers["SessionId"];
    }
}