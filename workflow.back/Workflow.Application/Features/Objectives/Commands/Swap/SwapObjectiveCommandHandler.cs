using AutoMapper;
using MediatR;
using Workflow.Application.Common.Exceptions;
using Workflow.Core.Models;
using Workflow.Persistense.Context;

namespace Workflow.Application.Features.Objectives.Commands.Swap;

public class SwapObjectiveCommandHandler(
    WorkflowDbContext context,
    IMapper mapper) : IRequestHandler<SwapObjectiveCommand, Unit>
{
    public async Task<Unit> Handle(SwapObjectiveCommand request, CancellationToken cancellationToken)
    {
        var objective =
            await context.Objectives.FindAsync(request.ObjectiveId);

        if (objective is null)
            throw new NotFoundException(nameof(Objective), request.ObjectiveId);

        objective.Order = request.Order;
        objective.ColumnId = request.ColumnId;

        await context.SaveChangesAsync(cancellationToken);

        return Unit.Value;
    }
}