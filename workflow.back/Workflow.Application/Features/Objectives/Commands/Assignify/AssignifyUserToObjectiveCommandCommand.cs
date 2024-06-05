using MediatR;
using Microsoft.EntityFrameworkCore;
using Workflow.Application.Common.Enums;
using Workflow.Application.Common.Exceptions;
using Workflow.Core.Models;
using Workflow.Persistense.Context;

namespace Workflow.Application.Features.Objectives.Commands.Assignify;

public sealed class AssignifyUserToObjectiveCommandCommand(WorkflowDbContext context)
    : IRequestHandler<AssignifyUserToObjectiveCommand, Unit>
{
    public async Task<Unit> Handle(AssignifyUserToObjectiveCommand request, CancellationToken cancellationToken)
    {
        var user = await context.Users.FindAsync(request.UserId)
                   ?? throw new NotFoundException(nameof(User), request.UserId);

        var objective = await context.Objectives
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

        await context.SaveChangesAsync(cancellationToken);

        return Unit.Value;
    }
}