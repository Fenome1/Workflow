using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Workflow.Application.Common.Exceptions;
using Workflow.Application.Common.Interfaces;
using Workflow.Application.ViewModels;
using Workflow.Persistense.Context;

namespace Workflow.Application.Features.Links.Queries.ByAgency;

public class GetLinkByAgencyQueryHandler(
    WorkflowDbContext context,
    ILinkService linkService,
    IMapper mapper)
    : IRequestHandler<GetLinkByAgencyQuery, LinkViewModel?>
{
    public async Task<LinkViewModel?> Handle(GetLinkByAgencyQuery request, CancellationToken cancellationToken)
    {
        var agency = await context.Agencies
            .Include(a => a.Link)
            .AsNoTrackingWithIdentityResolution()
            .FirstOrDefaultAsync(a => a.AgencyId == request.AgencyId,
                cancellationToken);

        if (agency is null)
            throw new NotFoundException(nameof(Agencies), request.AgencyId);

        if (agency.Link is null)
            return null;

        var value = linkService.GetLinkByToken(agency.Link.Token);

        var linkViewModel = mapper.Map<LinkViewModel>(agency.Link);
        linkViewModel.Value = value;

        return linkViewModel;
    }
}