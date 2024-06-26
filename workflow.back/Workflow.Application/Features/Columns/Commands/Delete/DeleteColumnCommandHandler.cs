﻿using MediatR;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Workflow.Application.Common.Enums.Static;
using Workflow.Application.Common.Exceptions;
using Workflow.Application.Hubs;
using Workflow.Core.Models;
using Workflow.Persistense.Configurations;
using Workflow.Persistense.Context;

namespace Workflow.Application.Features.Columns.Commands.Delete;

public sealed class DeleteColumnCommandHandler(WorkflowDbContext context, IHubContext<NotifyHub> hubContext)
    : IRequestHandler<DeleteColumnCommand, Unit>
{
    public async Task<Unit> Handle(DeleteColumnCommand request, CancellationToken cancellationToken)
    {
        var deletingColumn = await context.Columns
            .Include(c => c.Board.Project)
            .AsNoTrackingWithIdentityResolution()
            .FirstOrDefaultAsync(c => c.ColumnId == request.ColumnId,
                cancellationToken);

        if (deletingColumn is null)
            throw new NotFoundException(nameof(Column), request.ColumnId);

        return await context.WithTransactionAsync(async () =>
        {
            var remainingColumns = await context.Columns
                .Where(c => c.BoardId == deletingColumn.BoardId &&
                            c.ColumnId != request.ColumnId)
                .OrderBy(c => c.Order)
                .ToListAsync(cancellationToken);

            for (var i = 0; i < remainingColumns.Count; i++)
                remainingColumns[i].Order = i;

            context.Columns.Remove(deletingColumn);
            await context.SaveChangesAsync(cancellationToken);

            await hubContext.Clients.Group(
                    SignalGroups.AgencyGroupWithId(deletingColumn.Board.Project.AgencyId))
                .SendAsync(NotifyTypes.ColumnNotify, deletingColumn.Board.Project.AgencyId,
                    cancellationToken);

            return Unit.Value;
        }, cancellationToken);
    }
}