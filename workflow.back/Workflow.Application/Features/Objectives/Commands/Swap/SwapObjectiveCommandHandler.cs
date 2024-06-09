using MediatR;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Workflow.Application.Common.Exceptions;
using Workflow.Application.Hubs;
using Workflow.Core.Models;
using Workflow.Persistense.Configurations;
using Workflow.Persistense.Context;

namespace Workflow.Application.Features.Objectives.Commands.Swap;

public class SwapObjectiveCommandHandler(
    WorkflowDbContext context,
    IHubContext<NotifyHub> hubContext) : IRequestHandler<SwapObjectiveCommand, Unit>
{
    public async Task<Unit> Handle(SwapObjectiveCommand request, CancellationToken cancellationToken)
    {
        var objective = await context.Objectives
            .Include(o => o.Column.Board.Project)
            .FirstOrDefaultAsync(o => o.ObjectiveId == request.ObjectiveId,
                cancellationToken);

        if (objective == null)
            throw new NotFoundException(nameof(Objective), request.ObjectiveId);

        var sourceColumn = await context.Columns.FindAsync(objective.ColumnId);

        if (sourceColumn == null)
            throw new NotFoundException(nameof(Column), objective.ColumnId);

        var destinationColumn = await context.Columns.FindAsync(request.ColumnId);

        if (destinationColumn == null)
            throw new NotFoundException(nameof(Column), request.ColumnId);

        var sourceObjectives = await context.Objectives
            .Where(o => o.ColumnId == sourceColumn.ColumnId &&
                        o.ObjectiveId != objective.ObjectiveId)
            .OrderBy(o => o.Order)
            .ToListAsync(cancellationToken);

        var destinationObjectives = await context.Objectives
            .Where(o => o.ColumnId == destinationColumn.ColumnId)
            .OrderBy(o => o.Order)
            .ToListAsync(cancellationToken);

        return await context.WithTransactionAsync(async () =>
        {
            if (sourceColumn.ColumnId != destinationColumn.ColumnId)
            {
                objective.ColumnId = request.ColumnId;

                for (var i = 0; i < sourceObjectives.Count; i++)
                    sourceObjectives[i].Order = i;

                foreach (var obj in destinationObjectives.Where(o => o.Order >= request.TargetOrder)) obj.Order++;

                objective.Order = request.TargetOrder;
            }
            else
            {
                var targetIndex = request.TargetOrder;
                var originalIndex = objective.Order;

                if (targetIndex == originalIndex)
                    return Unit.Value;

                if (targetIndex < originalIndex)
                    foreach (var obj in destinationObjectives.Where(
                                 obj => obj.Order >= targetIndex &&
                                        obj.Order < originalIndex))
                        obj.Order++;
                else
                    foreach (var obj in destinationObjectives.Where(
                                 ojb => ojb.Order > originalIndex &&
                                        ojb.Order <= targetIndex))
                        obj.Order--;

                objective.Order = targetIndex;
            }

            await context.SaveChangesAsync(cancellationToken);

            await hubContext.Clients.Group($"Agency_{objective.Column.Board.Project.AgencyId}")
                .SendAsync("ObjectiveNotify", objective.Column.Board.Project.AgencyId,
                    cancellationToken);

            return Unit.Value;
        }, cancellationToken);
    }
}