using MediatR;
using Microsoft.EntityFrameworkCore;
using Workflow.Application.Common.Enums;
using Workflow.Application.Common.Exceptions;
using Workflow.Core.Models;
using Workflow.Persistense.Context;

namespace Workflow.Application.Features.Invitations.Commands.Recall;

public class RecallInvitationCommandHandler(WorkflowDbContext context) : IRequestHandler<RecallInvitationCommand, Unit>
{
    public async Task<Unit> Handle(RecallInvitationCommand request, CancellationToken cancellationToken)
    {
        var invitation = await context.Invitations
            .FirstOrDefaultAsync(ai =>
                    ai.InvitationId == request.InvitationId,
                cancellationToken);

        if (invitation is null)
            throw new NotFoundException(nameof(Invitation),
                request.InvitationId);

        if (invitation.InvitationStatusId != (int)InvitationStatuses.Expectation)
            throw new Exception("Действие не возможно");

        context.Invitations.Remove(invitation);

        await context.SaveChangesAsync(cancellationToken);

        return Unit.Value;
    }
}