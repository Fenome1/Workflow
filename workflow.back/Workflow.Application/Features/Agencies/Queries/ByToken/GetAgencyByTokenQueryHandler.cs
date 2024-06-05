using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Workflow.Application.Common.Exceptions;
using Workflow.Application.ViewModels;
using Workflow.Core.Models;
using Workflow.Persistense.Context;

namespace Workflow.Application.Features.Agencies.Queries.ByToken;

public class GetAgencyByTokenQueryHandler(
    WorkflowDbContext context,
    IMapper mapper) : IRequestHandler<GetAgencyByTokenQuery, AgencyViewModel>
{
    public async Task<AgencyViewModel> Handle(GetAgencyByTokenQuery request, CancellationToken cancellationToken)
    {
        var currentLink = await context.Links
            .Include(l => l.Agency)
            .AsNoTrackingWithIdentityResolution()
            .FirstOrDefaultAsync(l => l.Token == request.Token,
                cancellationToken);

        if (currentLink is null)
            throw new NotFoundException(nameof(Link));
        
        if (currentLink.ExpirationDate < DateTime.UtcNow)
            throw new Exception("Ссылка просрочена");

        return mapper.Map<AgencyViewModel>(currentLink.Agency);
    }
}