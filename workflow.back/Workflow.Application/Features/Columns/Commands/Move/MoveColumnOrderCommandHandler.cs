using MediatR;
using Microsoft.EntityFrameworkCore;
using Workflow.Application.Common.Exceptions;
using Workflow.Core.Models;
using Workflow.Persistense.Context;

namespace Workflow.Application.Features.Columns.Commands.Move;

public sealed class MoveColumnOrderCommandHandler(WorkflowDbContext context)
    : IRequestHandler<MoveColumnOrderCommand, Unit>
{
    public async Task<Unit> Handle(MoveColumnOrderCommand request, CancellationToken cancellationToken)
    {
        var currentColumn = await FindColumnAsync(request.ColumnId, cancellationToken);
        
        if (currentColumn is null)
            throw new NotFoundException(nameof(Column), request.ColumnId);
    }

    private async Task<Column?> FindColumnAsync(int childId, CancellationToken cancellationToken)
    {
        return await context.Columns
            .AsNoTrackingWithIdentityResolution()
            .FirstOrDefaultAsync(c => c.ColumnId == childId,
                cancellationToken);
    }
}