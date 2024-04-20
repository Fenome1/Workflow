using MediatR;
using Microsoft.EntityFrameworkCore;
using Workflow.Application.Common.Exceptions;
using Workflow.Core.Models;
using Workflow.Persistense.Context;

namespace Workflow.Application.Features.Objectives.Commands.Delete;

public sealed class DeleteObjectiveCommandHandler(WorkflowDbContext context)
    : IRequestHandler<DeleteObjectiveCommand, Unit>
{
    public async Task<Unit> Handle(DeleteObjectiveCommand request, CancellationToken cancellationToken)
    {
        var deletingObjective = await context.Objectives
            .FindAsync(request.ObjectiveId);

        if (deletingObjective is null)
            throw new NotFoundException(nameof(Objective), request.ObjectiveId);

        await using var transaction = await context.Database.BeginTransactionAsync(cancellationToken);

        var remainingObjectives = await context.Objectives
            .Where(o => o.ColumnId == deletingObjective.ColumnId &&
                        o.ObjectiveId != request.ObjectiveId)
            .OrderBy(o => o.Order)
            .ToListAsync(cancellationToken);

        for (var i = 0; i < remainingObjectives.Count; i++)
            remainingObjectives[i].Order = i + 1;

        context.Objectives.Remove(deletingObjective);
        await context.SaveChangesAsync(cancellationToken);
        await transaction.CommitAsync(cancellationToken);

        return Unit.Value;
    }
}