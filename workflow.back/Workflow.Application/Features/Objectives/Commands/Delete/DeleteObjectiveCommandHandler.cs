using MediatR;
using Workflow.Application.Common.Exceptions;
using Workflow.Persistense.Context;

namespace Workflow.Application.Features.Objectives.Commands.Delete;

public class DeleteObjectiveCommandHandler(WorkflowDbContext context) : IRequestHandler<DeleteObjectiveCommand, Unit>
{
    public async Task<Unit> Handle(DeleteObjectiveCommand request, CancellationToken cancellationToken)
    {
        var deletingObjective = await context.Objectives
            .FindAsync(request.ObjectiveId);

        if (deletingObjective is null)
            throw new NotFoundException(deletingObjective.GetType().ToString());

        context.Objectives.Remove(deletingObjective);
        await context.SaveChangesAsync(cancellationToken);

        return Unit.Value;
    }
}