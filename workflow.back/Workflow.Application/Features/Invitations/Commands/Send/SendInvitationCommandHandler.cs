using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Workflow.Application.Common.Enums;
using Workflow.Application.Common.Exceptions;
using Workflow.Core.Models;
using Workflow.Persistense.Context;

namespace Workflow.Application.Features.Invitations.Commands.Send;

public class SendInvitationCommandHandler(
    WorkflowDbContext context,
    IMapper mapper
) : IRequestHandler<SendInvitationCommand, int>
{
    public async Task<int> Handle(SendInvitationCommand request, CancellationToken cancellationToken)
    {
        await using var transaction = await context.Database.BeginTransactionAsync(cancellationToken);

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

        context.Invitations.RemoveRange(context.Invitations
            .Where(i => i.UserId == user.UserId &&
                        i.AgencyId == request.AgencyId));

        var invitation = mapper.Map<Invitation>(request);
        invitation.UserId = user.UserId;

        await context.Invitations.AddAsync(invitation, cancellationToken);
        await context.SaveChangesAsync(cancellationToken);

        await transaction.CommitAsync(cancellationToken);

        return invitation.InvitationId;
    }
}