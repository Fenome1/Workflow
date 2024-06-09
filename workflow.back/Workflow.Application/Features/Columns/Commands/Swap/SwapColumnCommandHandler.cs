using MediatR;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Workflow.Application.Common.Enums.Static;
using Workflow.Application.Common.Exceptions;
using Workflow.Application.Hubs;
using Workflow.Core.Models;
using Workflow.Persistense.Configurations;
using Workflow.Persistense.Context;

namespace Workflow.Application.Features.Columns.Commands.Swap;

public class SwapColumnCommandHandler(WorkflowDbContext context, IHubContext<NotifyHub> hubContext)
    : IRequestHandler<SwapColumnCommand, Unit>
{
    public async Task<Unit> Handle(SwapColumnCommand request, CancellationToken cancellationToken)
    {
        var column = await context.Columns
            .Include(c => c.Board.Project)
            .FirstOrDefaultAsync(c => c.ColumnId == request.ColumnId,
                cancellationToken);

        if (column is null)
            throw new NotFoundException(nameof(Column), request.ColumnId);

        var columns = await context.Columns
            .Where(c => c.BoardId == column.BoardId)
            .OrderBy(c => c.Order)
            .ToListAsync(cancellationToken);

        return await context.WithTransactionAsync(async () =>
        {
            var targetIndex = request.TargetOrder;
            var originalIndex = column.Order;

            if (targetIndex == originalIndex)
                return Unit.Value;

            if (targetIndex < originalIndex)
                foreach (var col in columns.Where(
                             col => col.Order >= targetIndex &&
                                    col.Order < originalIndex))
                    col.Order++;
            else
                foreach (var col in columns.Where(
                             col => col.Order > originalIndex &&
                                    col.Order <= targetIndex))
                    col.Order--;

            column.Order = targetIndex;

            await context.SaveChangesAsync(cancellationToken);

            await hubContext.Clients.Group(
                    SignalGroups.AgencyGroupWithId(column.Board.Project.AgencyId))
                .SendAsync(NotifyTypes.ColumnNotify,  column.Board.Project.AgencyId,
                    cancellationToken);

            return Unit.Value;
        }, cancellationToken);
    }
}