using System.Security.Claims;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Workflow.Application.Common.Exceptions;
using Workflow.Application.Common.Interfaces;
using Workflow.Application.ViewModels;
using Workflow.Persistense.Context;

namespace Workflow.Application.Features.Users.Commands.Refresh;

public sealed class RefreshCommandHandler(WorkflowDbContext context, ITokenService tokenService, IMapper mapper)
    : IRequestHandler<RefreshCommand, AuthResultViewModel>
{
    public async Task<AuthResultViewModel> Handle(RefreshCommand request, CancellationToken cancellationToken)
    {
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

        if (request.RefreshToken != user.RefreshToken?.Token)
            throw new NotFoundException("Invalid Token");

        var userViewModel = mapper.Map<UserViewModel>(user);

        if (DateTime.Now >= user.RefreshToken.ExpirationDate)
        {
            var newRefreshToken = tokenService.GenerateRefreshToken(user.UserId);
            var newAccessToken = tokenService.GenerateAccessToken(user);

            context.RefreshTokens.Update(newRefreshToken);
            await context.SaveChangesAsync(cancellationToken);

            return new AuthResultViewModel
            {
                AccessToken = newAccessToken,
                RefreshToken = newRefreshToken.Token,
                User = userViewModel
            };
        }

        return new AuthResultViewModel
        {
            AccessToken = tokenService.GenerateAccessToken(user),
            RefreshToken = user.RefreshToken.Token,
            User = userViewModel
        };
    }
}