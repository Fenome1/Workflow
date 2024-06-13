using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Workflow.Application.Common.Enums.Static;
using Workflow.Application.Common.Exceptions;
using Workflow.Application.Hubs;
using Workflow.Core.Models;
using Workflow.Persistense.Context;

namespace Workflow.Application.Features.Columns.Commands.Create;

public sealed class CreateColumnCommandHandler(
    WorkflowDbContext context,
    IHubContext<NotifyHub> hubContext,
    IMapper mapper)
    : IRequestHandler<CreateColumnCommand, int>
{
    public async Task<int> Handle(CreateColumnCommand request, CancellationToken cancellationToken)
    {
        var ownerBoard = await context.Boards
            .Include(b => b.Project)
            .Include(board => board.Columns)
            .AsNoTrackingWithIdentityResolution()
            .FirstOrDefaultAsync(b => b.BoardId == request.BoardId,
                cancellationToken);

        if (ownerBoard is null)
            throw new NotFoundException(nameof(Board), request.BoardId);

        var newColumn = mapper.Map<Column>(request);

        var lastOrder = ownerBoard.Columns.Count;
        newColumn.Order = lastOrder;

        await context.Columns.AddAsync(newColumn, cancellationToken);

        await context.SaveChangesAsync(cancellationToken);

        await hubContext.Clients.Group(
                SignalGroups.AgencyGroupWithId(ownerBoard.Project.AgencyId))
            .SendAsync(NotifyTypes.ColumnNotify, ownerBoard.Project.AgencyId,
                cancellationToken);

        return newColumn.ColumnId;
    }
}