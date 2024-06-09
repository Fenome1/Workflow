using MediatR;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Workflow.Application.Common.Enums.Static;
using Workflow.Application.Common.Exceptions;
using Workflow.Application.Hubs;
using Workflow.Core.Models;
using Workflow.Persistense.Context;

namespace Workflow.Application.Features.Boards.Commands.Delete;

public sealed class DeleteBoardCommandHandler(WorkflowDbContext context, IHubContext<NotifyHub> hubContext)
    : IRequestHandler<DeleteBoardCommand, Unit>
{
    public async Task<Unit> Handle(DeleteBoardCommand request, CancellationToken cancellationToken)
    {
        var deletingBoard = await context.Boards
            .Include(b => b.Project)
            .FirstOrDefaultAsync(b => b.BoardId == request.BoardId,
                cancellationToken);

        if (deletingBoard is null)
            throw new NotFoundException(nameof(Board), request.BoardId);

        context.Boards.Remove(deletingBoard);
        await context.SaveChangesAsync(cancellationToken);

        await hubContext.Clients.Group(SignalGroups.AgencyGroupWithId(deletingBoard.Project.AgencyId))
            .SendAsync(NotifyTypes.BoardNotify, deletingBoard.Project.AgencyId,
                cancellationToken);

        return Unit.Value;
    }
}