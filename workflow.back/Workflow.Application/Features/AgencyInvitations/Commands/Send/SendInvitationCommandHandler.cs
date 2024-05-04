using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Workflow.Core.Models;
using Workflow.Persistense.Context;

namespace Workflow.Application.Features.AgencyInvitations.Commands.Send;

public class SendInvitationCommandHandler(
    WorkflowDbContext context,
    IMapper mapper
) : IRequestHandler<SendInvitationCommand, int>
{
    public async Task<int> Handle(SendInvitationCommand request, CancellationToken cancellationToken)
    {
        var user = await context.Users
            .AsNoTrackingWithIdentityResolution()
            .FirstOrDefaultAsync(u => u.Email == request.Email, cancellationToken);

        if (user is null)
        {
            throw new Exception($"Пользователь: {request.Email} не найден");
        }

        var agency = await context.Agencies
            .Include(a => a.Users)
            .AsNoTrackingWithIdentityResolution()
            .FirstOrDefaultAsync(a => a.AgencyId == request.AgencyId, cancellationToken: cancellationToken);

        var userInAgency = agency?.Users?.Any(u => u.UserId == user.UserId);

        if (userInAgency.Value || user.UserId == agency.OwnerId)
            throw new Exception($"Пользователь {request.Email} уже состоит в данном агентстве");

        var invitation = mapper.Map<AgencyInvitation>(request);

        await context.AgencyInvitations.AddAsync(invitation, cancellationToken);
        await context.SaveChangesAsync(cancellationToken);

        return invitation.InvitationId;
    }
}