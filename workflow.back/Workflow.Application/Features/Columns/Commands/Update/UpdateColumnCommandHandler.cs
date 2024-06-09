using MediatR;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Workflow.Application.Common.Exceptions;
using Workflow.Application.Hubs;
using Workflow.Core.Models;
using Workflow.Persistense.Context;

namespace Workflow.Application.Features.Columns.Commands.Update;

public sealed class UpdateColumnCommandHandler(WorkflowDbContext context, IHubContext<NotifyHub> hubContext)
    : IRequestHandler<UpdateColumnCommand, int>
{
    public async Task<int> Handle(UpdateColumnCommand request, CancellationToken cancellationToken)
    {
        var editingColumn = await context.Columns
            .Include(c => c.Board.Project)
            .FirstOrDefaultAsync(c => c.ColumnId == request.ColumnId,
                cancellationToken);

        if (editingColumn is null)
            throw new NotFoundException(nameof(Column), request.ColumnId);

        if (!string.IsNullOrWhiteSpace(request.Name))
            editingColumn.Name = request.Name;

        await context.SaveChangesAsync(cancellationToken);

        await hubContext.Clients.Group($"Agency_{editingColumn.Board.Project.AgencyId}")
            .SendAsync("ColumnNotify", editingColumn.Board.Project.AgencyId,
                cancellationToken);

        return editingColumn.BoardId;
    }
}