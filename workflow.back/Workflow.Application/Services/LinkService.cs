using System.Security.Cryptography;
using Microsoft.Extensions.Configuration;
using Workflow.Application.Common.Interfaces;

namespace Workflow.Application.Services;

public class LinkService(IConfiguration configuration) : ILinkService
{
    public string GenerateToken()
    {
        var tokenBytes = new byte[32];
        using var rng = new RNGCryptoServiceProvider();

        rng.GetBytes(tokenBytes);

        var token = BitConverter.ToString(tokenBytes)
            .Replace("-", "").ToLower();

        return token;
    }

    public string GetLinkByToken(string token)
    {
        var linkStart = configuration["BaseLink"];

        return $"{linkStart}/join/{token}";
    }
}