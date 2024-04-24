using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Workflow.Application.Common.Exceptions;
using Workflow.Application.ViewModels;
using Workflow.Core.Models;
using Workflow.Persistense.Context;

namespace Workflow.Application.Features.Users.Queries.ByAgency;

public class ListUsersByAgencyQueryHandler(WorkflowDbContext context, IMapper mapper)
    : IRequestHandler<ListUsersByAgencyQuery, List<UserViewModel>>
{
    public async Task<List<UserViewModel>> Handle(ListUsersByAgencyQuery request, CancellationToken cancellationToken)
    {
        var isAgencyExist = await context.Agencies
            .AsNoTrackingWithIdentityResolution()
            .AnyAsync(a => a.AgencyId == request.AgencyId,
                cancellationToken);

        if (!isAgencyExist)
            throw new NotFoundException(nameof(Agency), request.AgencyId);

        var usersAndOwner = await context.Users
            .Include(u => u.AgenciesNavigation)
            .AsNoTrackingWithIdentityResolution()
            .Where(u => u.Agencies
                            .Any(a => a.AgencyId == request.AgencyId) ||
                        u.AgenciesNavigation.Any(a => a.OwnerId == u.UserId && a.AgencyId == request.AgencyId))
            .Select(u => mapper.Map<UserViewModel>(u))
            .ToListAsync(cancellationToken);

        return usersAndOwner;
    }
}