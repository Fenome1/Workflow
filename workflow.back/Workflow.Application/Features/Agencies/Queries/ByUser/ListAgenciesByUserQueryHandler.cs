using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Workflow.Application.Common.Exceptions;
using Workflow.Application.ViewModels;
using Workflow.Persistense.Context;

namespace Workflow.Application.Features.Agencies.Queries.ByUser;

public class ListAgenciesByUserQueryHandler(WorkflowDbContext context, IMapper mapper)
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
            .ToListAsync(cancellationToken: cancellationToken);

        if (userAgencies is null)
            throw new NotFoundException(nameof(userAgencies));

        var agenciesViewModel = mapper.Map<List<AgencyViewModel>>(userAgencies);

        return agenciesViewModel;
    }
}