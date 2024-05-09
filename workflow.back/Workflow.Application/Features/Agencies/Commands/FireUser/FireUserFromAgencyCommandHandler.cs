﻿using MediatR;
using Microsoft.EntityFrameworkCore;
using Workflow.Application.Common.Exceptions;
using Workflow.Core.Models;
using Workflow.Persistense.Context;

namespace Workflow.Application.Features.Agencies.Commands.FireUser;

public class FireUserFromAgencyCommandHandler(WorkflowDbContext context)
    : IRequestHandler<FireUserFromAgencyCommand, Unit>
{
    public async Task<Unit> Handle(FireUserFromAgencyCommand request, CancellationToken cancellationToken)
    {
        await using var transaction = await context.Database.BeginTransactionAsync(cancellationToken);

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

        await transaction.CommitAsync(cancellationToken);

        return Unit.Value;
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