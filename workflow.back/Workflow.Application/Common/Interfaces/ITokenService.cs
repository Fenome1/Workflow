using System.Security.Claims;
using Workflow.Core.Models;

namespace Workflow.Application.Common.Interfaces;

public interface ITokenService
{
    ClaimsPrincipal GetPrincipalFromExpiredToken(string accessToken);
    string GenerateAccessToken(User user);
    RefreshToken GenerateRefreshToken(int userId);
}