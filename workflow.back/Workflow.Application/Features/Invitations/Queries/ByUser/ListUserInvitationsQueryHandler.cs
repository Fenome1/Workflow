using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Workflow.Application.Common.Enums;
using Workflow.Application.Common.Exceptions;
using Workflow.Application.ViewModels;
using Workflow.Core.Models;
using Workflow.Persistense.Context;

namespace Workflow.Application.Features.Invitations.Queries.ByUser;

public class ListUserInvitationsQueryHandler(
    WorkflowDbContext context,
    IMapper mapper) : IRequestHandler<ListUserInvitationsQuery, List<InvitationViewModel>>
{
    public async Task<List<InvitationViewModel>> Handle(ListUserInvitationsQuery request,
        CancellationToken cancellationToken)
    {
        var userExists = await context.Users
            .AsNoTrackingWithIdentityResolution()
            .AnyAsync(u => u.UserId == request.UserId,
                cancellationToken);

        if (!userExists)
            throw new NotFoundException(nameof(User), request.UserId);

        var invitations = await context.Invitations
            .AsNoTrackingWithIdentityResolution()
            .Include(i => i.InvitationStatus)
            .Include(i => i.Agency)
            .ThenInclude(a => a.Owner)
            .Where(i => i.UserId == request.UserId && 
                        i.InvitationStatusId == (int) InvitationStatuses.Expectation)
            .Select(invitation => mapper.Map<InvitationViewModel>(invitation))
            .ToListAsync(cancellationToken);

        return invitations;
    }
}