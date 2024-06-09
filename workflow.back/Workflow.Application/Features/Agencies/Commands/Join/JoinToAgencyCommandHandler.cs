using MediatR;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Workflow.Application.Common.Exceptions;
using Workflow.Application.Hubs;
using Workflow.Core.Models;
using Workflow.Persistense.Context;

namespace Workflow.Application.Features.Agencies.Commands.Join;

public class JoinToAgencyCommandHandler(WorkflowDbContext context, IHubContext<NotifyHub> hubContext)
    : IRequestHandler<JoinToAgencyCommand, Unit>
{
    public async Task<Unit> Handle(JoinToAgencyCommand request, CancellationToken cancellationToken)
    {
        var agency = await context.Agencies
            .Include(a => a.Users).Include(agency => agency.Link)
            .FirstOrDefaultAsync(a => a.AgencyId == request.AgencyId,
                cancellationToken);

        if (agency is null)
            throw new NotFoundException(nameof(Agency), request.AgencyId);

        var user = await context.Users
            .AsNoTrackingWithIdentityResolution()
            .FirstOrDefaultAsync(u => u.UserId == request.UserId,
                cancellationToken);

        if (user is null)
            throw new NotFoundException(nameof(User), request.UserId);

        var isUserInAgency = agency.Users
            .Any(u => u.UserId == user.UserId);

        if (isUserInAgency || agency.OwnerId == user.UserId)
            throw new Exception($"Вы уже являетесь участником или " +
                                $"владельцем агентства \"{agency.Name}\"");

        agency.Users.Add(user);

        if (agency.Link is not null)
            agency.Link.UsedCount++;

        await context.SaveChangesAsync(cancellationToken);

        await hubContext.Clients.Group($"Agency_{agency.AgencyId}")
            .SendAsync("AgencyNotify", agency.AgencyId,
                cancellationToken);

        return Unit.Value;
    }
}