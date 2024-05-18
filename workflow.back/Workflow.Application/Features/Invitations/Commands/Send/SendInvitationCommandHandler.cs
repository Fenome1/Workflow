using MediatR;
using Microsoft.EntityFrameworkCore;
using Workflow.Application.Common.Enums;
using Workflow.Application.Common.Exceptions;
using Workflow.Core.Models;
using Workflow.Persistense.Configurations;
using Workflow.Persistense.Context;

namespace Workflow.Application.Features.Invitations.Commands.Send;

public sealed class SendInvitationCommandHandler(
    WorkflowDbContext context
) : IRequestHandler<SendInvitationCommand, int>
{
    public async Task<int> Handle(SendInvitationCommand request, CancellationToken cancellationToken)
    {
        return await context.WithTransactionAsync(async () =>
        {
            var user = await context.Users
                .AsNoTrackingWithIdentityResolution()
                .FirstOrDefaultAsync(u => u.Email == request.Email, cancellationToken);

            if (user is null)
                throw new Exception($"Пользователь: {request.Email} не найден");

            var agency = await context.Agencies
                .Include(a => a.Users)
                .AsNoTrackingWithIdentityResolution()
                .FirstOrDefaultAsync(a => a.AgencyId == request.AgencyId,
                    cancellationToken);

            if (agency is null)
                throw new NotFoundException(nameof(Agency), request.AgencyId);

            var userInAgency = agency?.Users?
                .Any(u => u.UserId == user.UserId);

            if (userInAgency.Value || user.UserId == agency.OwnerId)
                throw new Exception($"Пользователь {request.Email} уже состоит в данном агентстве");

            var existingInvitation = await context.Invitations
                .FirstOrDefaultAsync(i => i.UserId == user.UserId &&
                                          i.AgencyId == request.AgencyId &&
                                          i.InvitationStatusId == (int)InvitationStatuses.Expectation,
                    cancellationToken);

            if (existingInvitation is not null)
                throw new Exception($"Пользователю {request.Email} уже отправлено приглашение в данное агентство");


            var existingInvitations = await context.Invitations
                .Where(i => i.UserId == user.UserId &&
                            i.AgencyId == request.AgencyId)
                .ToListAsync(cancellationToken);

            if (existingInvitations is not null && existingInvitations.Count > 0)
                context.Invitations.RemoveRange(existingInvitations);

            var invitation = new Invitation
            {
                AgencyId = request.AgencyId,
                UserId = user.UserId
            };

            await context.Invitations.AddAsync(invitation, cancellationToken);
            await context.SaveChangesAsync(cancellationToken);

            return invitation.InvitationId;
        }, cancellationToken);
    }
}