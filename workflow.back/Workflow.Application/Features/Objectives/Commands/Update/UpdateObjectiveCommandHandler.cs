using MediatR;
using Workflow.Application.Common.Exceptions;
using Workflow.Core.Models;
using Workflow.Persistense.Context;

namespace Workflow.Application.Features.Objectives.Commands.Update;

public sealed class UpdateObjectiveCommandHandler(WorkflowDbContext context)
    : IRequestHandler<UpdateObjectiveCommand, int>
{
    public async Task<int> Handle(UpdateObjectiveCommand request, CancellationToken cancellationToken)
    {
        await using var transaction = await context.Database
            .BeginTransactionAsync(cancellationToken);

        var objective = await context.Objectives.FindAsync(request.ObjectiveId);

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
        await transaction.CommitAsync(cancellationToken);

        return objective.ObjectiveId;
    }
}