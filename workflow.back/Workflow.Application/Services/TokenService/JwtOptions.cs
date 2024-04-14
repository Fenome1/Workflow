namespace Workflow.Application.Services.TokenService;

public class JwtOptions
{
    public string Audience { get; set; } = string.Empty;
    public string Issuer { get; set; } = string.Empty;
    public string SecretKey { get; set; } = string.Empty;
    public int ExpiresMinutes { get; set; }
}