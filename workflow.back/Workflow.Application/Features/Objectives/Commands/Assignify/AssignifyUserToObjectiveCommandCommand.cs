using MediatR;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Workflow.Application.Common.Enums;
using Workflow.Application.Common.Exceptions;
using Workflow.Application.Hubs;
using Workflow.Core.Models;
using Workflow.Persistense.Context;

namespace Workflow.Application.Features.Objectives.Commands.Assignify;

public sealed class AssignifyUserToObjectiveCommandCommand(WorkflowDbContext context, IHubContext<NotifyHub> hubContext)
    : IRequestHandler<AssignifyUserToObjectiveCommand, Unit>
{
    public async Task<Unit> Handle(AssignifyUserToObjectiveCommand request, CancellationToken cancellationToken)
    {
        var user = await context.Users.FindAsync(request.UserId)
                   ?? throw new NotFoundException(nameof(User), request.UserId);

        var objective = await context.Objectives
                            .Include(o => o.Column.Board.Project)
                            .Include(o => o.Users)
                            .FirstOrDefaultAsync(o => o.ObjectiveId == request.ObjectiveId, cancellationToken)
                        ?? throw new NotFoundException(nameof(Objective), request.ObjectiveId);

        if (request.AssignifyType == AssignifyType.Assign)
        {
            if (objective.Users.Contains(user))
                throw new Exception($"Пользователь уже подписан на задачу с Id: {objective.ObjectiveId}");

            objective.Users.Add(user);
        }
        else
        {
            if (!objective.Users.Contains(user))
                throw new Exception($"Пользователь и так не подписан на задачу с Id: {objective.ObjectiveId}");

            objective.Users.Remove(user);
        }

        await hubContext.Clients.Group($"Agency_{objective.Column.Board.Project.AgencyId}")
            .SendAsync("ObjectiveNotify", objective.Column.Board.Project.AgencyId,
                cancellationToken);

        await context.SaveChangesAsync(cancellationToken);

        return Unit.Value;
    }
}