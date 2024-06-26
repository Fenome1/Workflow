﻿using MediatR;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Workflow.Application.Common.Enums.Static;
using Workflow.Application.Common.Exceptions;
using Workflow.Application.Hubs;
using Workflow.Core.Models;
using Workflow.Persistense.Context;

namespace Workflow.Application.Features.Objectives.Commands.Update;

public sealed class UpdateObjectiveCommandHandler(WorkflowDbContext context, IHubContext<NotifyHub> hubContext)
    : IRequestHandler<UpdateObjectiveCommand, int>
{
    public async Task<int> Handle(UpdateObjectiveCommand request, CancellationToken cancellationToken)
    {
        var objective = await context.Objectives
            .Include(o => o.Column.Board.Project)
            .FirstOrDefaultAsync(o => o.ObjectiveId == request.ObjectiveId,
                cancellationToken);

        if (objective is null)
            throw new NotFoundException(nameof(Objective), request.ObjectiveId);

        if (request.IsDeadlineReset)
            objective.Deadline = null;
        else if (request.Deadline is not null)
            objective.Deadline = request.Deadline;

        if (request.IsPriorityReset)
            objective.PriorityId = null;
        else if (request.PriorityId is not null)
            objective.PriorityId = request.PriorityId.Value;

        if (!string.IsNullOrWhiteSpace(request.Name))
            objective.Name = request.Name;

        if (request.Status is not null)
            objective.Status = request.Status.Value;

        await context.SaveChangesAsync(cancellationToken);

        await hubContext.Clients.Group(
                SignalGroups.AgencyGroupWithId(objective.Column.Board.Project.AgencyId))
            .SendAsync(NotifyTypes.ObjectiveNotify, objective.Column.Board.Project.AgencyId,
                cancellationToken);

        return objective.ObjectiveId;
    }
}