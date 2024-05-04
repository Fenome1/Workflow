using System.ComponentModel;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Workflow.Application.Common.Enums;
using Workflow.Application.Common.Exceptions;
using Workflow.Core.Models;
using Workflow.Persistense.Context;
using InvitationStatus = Workflow.Core.Models.InvitationStatus;

namespace Workflow.Application.Features.AgencyInvitations.Commands.Answer;

public sealed class AnswerOnInvitationCommandHandler(WorkflowDbContext context)
    : IRequestHandler<AnswerOnInvitationCommand, Unit>
{
    public async Task<Unit> Handle(AnswerOnInvitationCommand request, CancellationToken cancellationToken)
    {
        var invitation = await context.AgencyInvitations
            .Include(i => i.Agency)
            .Include(i => i.User)
            .FirstOrDefaultAsync(i => i.InvitationId == request.AgencyInvitationId,
                cancellationToken);

        if (invitation is null)
        {
            throw new NotFoundException($"Приглашение с ID {request.AgencyInvitationId} не найдено.");
        }

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
    }
}