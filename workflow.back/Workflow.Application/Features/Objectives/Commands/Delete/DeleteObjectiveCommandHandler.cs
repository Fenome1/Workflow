using MediatR;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Workflow.Application.Common.Enums.Static;
using Workflow.Application.Common.Exceptions;
using Workflow.Application.Hubs;
using Workflow.Core.Models;
using Workflow.Persistense.Configurations;
using Workflow.Persistense.Context;

namespace Workflow.Application.Features.Objectives.Commands.Delete;

public sealed class DeleteObjectiveCommandHandler(WorkflowDbContext context, IHubContext<NotifyHub> hubContext)
    : IRequestHandler<DeleteObjectiveCommand, Unit>
{
    public async Task<Unit> Handle(DeleteObjectiveCommand request, CancellationToken cancellationToken)
    {
        var deletingObjective = await context.Objectives
            .Include(o => o.Column.Board.Project)
            .FirstOrDefaultAsync(o => o.ObjectiveId == request.ObjectiveId,
                cancellationToken);

        if (deletingObjective is null)
            throw new NotFoundException(nameof(Objective), request.ObjectiveId);

        return await context.WithTransactionAsync(async () =>
        {
            var remainingObjectives = await context.Objectives
                .Where(o => o.ColumnId == deletingObjective.ColumnId &&
                            o.ObjectiveId != request.ObjectiveId)
                .OrderBy(o => o.Order)
                .ToListAsync(cancellationToken);

            for (var i = 0; i < remainingObjectives.Count; i++)
                remainingObjectives[i].Order = i;

            context.Objectives.Remove(deletingObjective);
            await context.SaveChangesAsync(cancellationToken);

            await hubContext.Clients.Group(
                    SignalGroups.AgencyGroupWithId(deletingObjective.Column.Board.Project.AgencyId))
                .SendAsync(NotifyTypes.ObjectiveNotify, deletingObjective.Column.Board.Project.AgencyId,
                    cancellationToken);

            return Unit.Value;
        }, cancellationToken);
    }
}