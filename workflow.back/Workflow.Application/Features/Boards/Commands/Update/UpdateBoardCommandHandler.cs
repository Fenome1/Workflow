using MediatR;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Workflow.Application.Common.Enums.Static;
using Workflow.Application.Common.Exceptions;
using Workflow.Application.Hubs;
using Workflow.Core.Models;
using Workflow.Persistense.Context;

namespace Workflow.Application.Features.Boards.Commands.Update;

public sealed class UpdateBoardCommandHandler(WorkflowDbContext context, IHubContext<NotifyHub> hubContext)
    : IRequestHandler<UpdateBoardCommand, int>
{
    public async Task<int> Handle(UpdateBoardCommand request, CancellationToken cancellationToken)
    {
        var editingBoard = await context.Boards
            .Include(b => b.Project)
            .FirstOrDefaultAsync(b => b.BoardId == request.BoardId,
                cancellationToken);

        if (editingBoard is null)
            throw new NotFoundException(nameof(Board), request.BoardId);

        editingBoard.Name = request.Name;

        editingBoard.Description = request.Description;

        await context.SaveChangesAsync(cancellationToken);

        await hubContext.Clients.Group(SignalGroups.AgencyGroupWithId(editingBoard.Project.AgencyId))
            .SendAsync(NotifyTypes.BoardNotify, editingBoard.Project.AgencyId,
                cancellationToken);

        return editingBoard.BoardId;
    }
}