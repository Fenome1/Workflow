using MediatR;
using Workflow.Application.Common.Exceptions;
using Workflow.Core.Models;
using Workflow.Persistense.Context;

namespace Workflow.Application.Features.Columns.Commands.Update;

public sealed class UpdateColumnCommandHandler(WorkflowDbContext context) : IRequestHandler<UpdateColumnCommand, int>
{
    public async Task<int> Handle(UpdateColumnCommand request, CancellationToken cancellationToken)
    {
        var editingColumn = await context.Columns
            .FindAsync(request.ColumnId);

        if (editingColumn is null)
            throw new NotFoundException(nameof(Column), request.ColumnId);

        if (!string.IsNullOrWhiteSpace(request.Name))
            editingColumn.Name = request.Name;

        await context.SaveChangesAsync(cancellationToken);

        return editingColumn.BoardId;
    }
}