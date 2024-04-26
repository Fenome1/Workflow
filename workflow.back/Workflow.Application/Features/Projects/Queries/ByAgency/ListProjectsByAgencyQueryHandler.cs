using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Workflow.Application.ViewModels;
using Workflow.Persistense.Context;

namespace Workflow.Application.Features.Projects.Queries.ByAgency;

public sealed class ListProjectsByAgencyQueryHandler(
    WorkflowDbContext context,
    IMapper mapper) : IRequestHandler<ListProjectsByAgencyQuery, List<ProjectViewModel>>
{
    public async Task<List<ProjectViewModel>> Handle(ListProjectsByAgencyQuery request,
        CancellationToken cancellationToken)
    {
        var projectsByAgencies = await context.Projects
            .AsNoTrackingWithIdentityResolution()
            .Where(p => p.AgencyId == request.AgencyId)
            .ToListAsync(cancellationToken);

        return mapper.Map<List<ProjectViewModel>>(projectsByAgencies);
    }
}