using MediatR;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Workflow.Application.Common.Enums.Static;
using Workflow.Application.Common.Exceptions;
using Workflow.Application.Hubs;
using Workflow.Core.Models;
using Workflow.Persistense.Configurations;
using Workflow.Persistense.Context;

namespace Workflow.Application.Features.Agencies.Commands.FireUser;

public sealed class FireUserFromAgencyCommandHandler(WorkflowDbContext context, IHubContext<NotifyHub> hubContext)
    : IRequestHandler<FireUserFromAgencyCommand, Unit>
{
    public async Task<Unit> Handle(FireUserFromAgencyCommand request, CancellationToken cancellationToken)
    {
        return await context.WithTransactionAsync(async () =>
        {
            var agency = await context.Agencies
                .Include(a => a.Projects)
                .ThenInclude(p => p.Boards)
                .ThenInclude(c => c.Columns)
                .ThenInclude(b => b.Objectives)
                .ThenInclude(objective => objective.Users)
                .Include(agency => agency.Users)
                .FirstOrDefaultAsync(a => a.AgencyId == request.AgencyId,
                    cancellationToken);

            if (agency is null)
                throw new NotFoundException(nameof(Agency), request.AgencyId);

            var user = agency.Users
                .FirstOrDefault(u => u.UserId == request.UserId);

            if (user is null)
                throw new NotFoundException($"Пользователь: {user.UserId} не состоит в агентстве: {agency.AgencyId}");

            UnassignUserFromAgencyObjectives(agency, user);

            agency.Users.Remove(user);

            await context.SaveChangesAsync(cancellationToken);

            await hubContext.Clients.Group(SignalGroups.AgencyGroupWithId(agency.AgencyId))
                .SendAsync(NotifyTypes.AgencyNotify, agency.AgencyId,
                    cancellationToken);

            return Unit.Value;
        }, cancellationToken);
    }

    private static void UnassignUserFromAgencyObjectives(Agency agency, User user)
    {
        var objectivesToUnassign = agency.Projects
            .SelectMany(p => p.Boards)
            .SelectMany(b => b.Columns)
            .SelectMany(c => c.Objectives)
            .Where(o => o.Users
                .Any(u => u.UserId == user.UserId))
            .ToList();

        foreach (var objective in objectivesToUnassign)
            user.Objectives.Remove(objective);
    }
}