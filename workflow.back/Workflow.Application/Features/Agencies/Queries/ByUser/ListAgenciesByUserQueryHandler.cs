using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Workflow.Application.ViewModels;
using Workflow.Persistense.Context;

namespace Workflow.Application.Features.Agencies.Queries.ByUser;

public sealed class ListAgenciesByUserQueryHandler(WorkflowDbContext context, IMapper mapper)
    : IRequestHandler<ListAgenciesByUserQuery, List<AgencyViewModel>>
{
    public async Task<List<AgencyViewModel>> Handle(ListAgenciesByUserQuery request,
        CancellationToken cancellationToken)
    {
        var userAgencies = await context.Agencies
            .AsNoTrackingWithIdentityResolution()
            .Include(a => a.Users)
            .Where(a => a.OwnerId == request.UserId ||
                        a.Users.Any(u => u.UserId == request.UserId))
            .ToListAsync(cancellationToken);

        var agenciesViewModel = mapper.Map<List<AgencyViewModel>>(userAgencies);

        return agenciesViewModel;
    }
}