using MediatR;
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
            throw new NotFoundException(nameof(Column), deletingColumn!.ColumnId);

        context.Columns.Remove(deletingColumn);
        await context.SaveChangesAsync(cancellationToken);

        return Unit.Value;
    }
}