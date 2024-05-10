using System.ComponentModel;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Workflow.Application.Common.Enums;
using Workflow.Application.Common.Exceptions;
using Workflow.Core.Models;
using Workflow.Persistense.Context;

namespace Workflow.Application.Features.Invitations.Commands.Answer;

public sealed class AnswerOnInvitationCommandHandler(WorkflowDbContext context)
    : IRequestHandler<AnswerOnInvitationCommand, Unit>
{
    public async Task<Unit> Handle(AnswerOnInvitationCommand request, CancellationToken cancellationToken)
    {
        return await context.WithTransactionAsync(async () =>
        {
            var invitation = await context.Invitations
                .Include(i => i.Agency)
                .Include(i => i.User)
                .FirstOrDefaultAsync(i => i.InvitationId == request.InvitationId,
                    cancellationToken);

            if (invitation is null)
                throw new NotFoundException(nameof(Invitation), request.InvitationId);

            if (invitation.InvitationStatusId != (int)InvitationStatuses.Expectation)
                throw new Exception("Приглашение не действительно");

            switch (request.AnswerType)
            {
                case AnswerType.Accept:
                    invitation.Agency.Users.Add(invitation.User);
                    invitation.InvitationStatusId = (int)InvitationStatuses.Accepted;
                    break;
                case AnswerType.Deny:
                    invitation.InvitationStatusId = (int)InvitationStatuses.Denied;
                    break;
                default:
                    throw new InvalidEnumArgumentException(nameof(request.AnswerType), (int)request.AnswerType,
                        typeof(AnswerType));
            }

            await context.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }, cancellationToken);
    }
}