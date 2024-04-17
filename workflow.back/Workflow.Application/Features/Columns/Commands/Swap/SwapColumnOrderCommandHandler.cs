using MediatR;
using Microsoft.EntityFrameworkCore;
using Workflow.Application.Common.Exceptions;
using Workflow.Core.Models;
using Workflow.Persistense.Context;

namespace Workflow.Application.Features.Columns.Commands.Swap;

public sealed class SwapColumnOrderCommandHandler(WorkflowDbContext context)
    : IRequestHandler<SwapColumnOrderCommand, Unit>
{
    public async Task<Unit> Handle(SwapColumnOrderCommand request, CancellationToken cancellationToken)
    {
        var firstChild = await FindColumnAsync(request.FirstChildId, cancellationToken);

        if (firstChild is null)
            throw new NotFoundException(nameof(firstChild));

        var secondChild = await FindColumnAsync(request.SecondChildId, cancellationToken);

        if (secondChild is null)
            throw new NotFoundException(nameof(secondChild));

        (firstChild.Order, secondChild.Order) = (secondChild.Order, firstChild.Order);

        await context.SaveChangesAsync(cancellationToken);

        return Unit.Value;
    }

    private async Task<Column?> FindColumnAsync(int childId, CancellationToken cancellationToken)
    {
        return await context.Columns
            .AsNoTrackingWithIdentityResolution()
            .FirstOrDefaultAsync(c => c.ColumnId == childId,
                cancellationToken);
    }
}