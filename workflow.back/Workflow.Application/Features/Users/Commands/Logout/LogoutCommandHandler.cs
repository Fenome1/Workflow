using System.Security.Claims;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Workflow.Application.Common.Exceptions;
using Workflow.Application.Common.Interfaces;
using Workflow.Persistense.Context;

namespace Workflow.Application.Features.Users.Commands.Logout;

public sealed class LogoutCommandHandler(WorkflowDbContext context, ITokenService tokenService, IMapper mapper)
    : IRequestHandler<LogoutCommand, bool>
{
    public async Task<bool> Handle(LogoutCommand request, CancellationToken cancellationToken)
    {
        if (string.IsNullOrWhiteSpace(request.AccessToken) || string.IsNullOrWhiteSpace(request.RefreshToken))
            throw new NotFoundException(nameof(request));

        var principal = tokenService.GetPrincipalFromExpiredToken(request.AccessToken);
        var nameIdClaim = principal.FindFirst(ClaimTypes.NameIdentifier);

        if (nameIdClaim is null || !int.TryParse(nameIdClaim.Value, out var userId))
            throw new NotFoundException(nameof(nameIdClaim));

        var user = await context.Users
            .Include(u => u.RefreshToken)
            .FirstOrDefaultAsync(u => u.UserId == userId,
                cancellationToken);

        if (user is null)
            throw new NotFoundException(nameof(user));

        if (user.RefreshToken is null)
            throw new NotFoundException(nameof(user.RefreshToken));

        context.RefreshTokens.Remove(user.RefreshToken);

        return await context.SaveChangesAsync(cancellationToken) > 0;
    }
}