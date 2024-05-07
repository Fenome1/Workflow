using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Workflow.Application.Common.Exceptions;
using Workflow.Application.ViewModels;
using Workflow.Core.Models;
using Workflow.Persistense.Context;

namespace Workflow.Application.Features.Invitations.Queries.ByAgency;

public class ListAgencyInvitationsQueryHandler(
    WorkflowDbContext context,
    IMapper mapper) : IRequestHandler<ListAgencyInvitationsQuery, List<InvitationViewModel>>
{
    public async Task<List<InvitationViewModel>> Handle(ListAgencyInvitationsQuery request,
        CancellationToken cancellationToken)
    {
        var isAgencyExists = await context.Agencies
            .AsNoTrackingWithIdentityResolution()
            .AnyAsync(a => a.AgencyId == request.AgencyId,
                cancellationToken);

        if (!isAgencyExists)
            throw new NotFoundException(nameof(Agency), request.AgencyId);

        var invitations = await context.Invitations
            .AsNoTrackingWithIdentityResolution()
            .Include(i => i.Agency)
            .ThenInclude(a => a.Owner)
            .Include(i => i.User)
            .Include(i => i.InvitationStatus)
            .Where(i => i.AgencyId == request.AgencyId)
            .Select(u => mapper.Map<InvitationViewModel>(u))
            .ToListAsync(cancellationToken);

        return invitations;
    }
}