using Backend.Models;

namespace Backend.Extensions;

public static class ConfigurationExtensions
{
    public static IEnumerable<DoodleNetEntry> GetDoodleNetEntries(this IConfiguration configuration)
    {
        return configuration.GetSection("DoodleNet").Get<IEnumerable<DoodleNetEntry>>();
    }
}