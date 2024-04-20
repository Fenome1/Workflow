using MediatR;
using Microsoft.EntityFrameworkCore;
using Workflow.Application.Common.Exceptions;
using Workflow.Core.Models;
using Workflow.Persistense.Context;

namespace Workflow.Application.Features.Columns.Commands.Delete;

public sealed class DeleteColumnCommandHandler(WorkflowDbContext context) : IRequestHandler<DeleteColumnCommand, Unit>
{
    public async Task<Unit> Handle(DeleteColumnCommand request, CancellationToken cancellationToken)
    {
        var deletingColumn = await context.Columns
            .FindAsync(request.ColumnId);

        if (deletingColumn is null)
            throw new NotFoundException(nameof(Column), request.ColumnId);

        await using var transaction = await context.Database.BeginTransactionAsync(cancellationToken);

        var remainingColumns = await context.Columns
            .Where(c => c.BoardId == deletingColumn.BoardId &&
                        c.ColumnId != request.ColumnId)
            .OrderBy(c => c.Order)
            .ToListAsync(cancellationToken);

        for (var i = 0; i < remainingColumns.Count; i++)
            remainingColumns[i].Order = i + 1;

        context.Columns.Remove(deletingColumn);
        await context.SaveChangesAsync(cancellationToken);
        await transaction.CommitAsync(cancellationToken);

        return Unit.Value;
    }
}