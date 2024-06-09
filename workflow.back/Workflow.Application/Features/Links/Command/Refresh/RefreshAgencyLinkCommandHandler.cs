using MediatR;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Workflow.Application.Common.Exceptions;
using Workflow.Application.Common.Interfaces;
using Workflow.Application.Hubs;
using Workflow.Core.Models;
using Workflow.Persistense.Configurations;
using Workflow.Persistense.Context;

namespace Workflow.Application.Features.Links.Command.Refresh;

public class RefreshAgencyLinkCommandHandler(
    WorkflowDbContext context,
    IMediator mediator,
    IHubContext<NotifyHub> hubContext,
    ILinkService linkService)
    : IRequestHandler<RefreshAgencyLinkCommand, Unit>
{
    public async Task<Unit> Handle(RefreshAgencyLinkCommand request, CancellationToken cancellationToken)
    {
        return await context.WithTransactionAsync(async () =>
        {
            var agency = await context.Agencies
                .Include(a => a.Link)
                .AsNoTrackingWithIdentityResolution()
                .FirstOrDefaultAsync(a => a.AgencyId == request.AgencyId,
                    cancellationToken);

            if (agency is null)
                throw new NotFoundException(nameof(Agency), request.AgencyId);

            if (agency.Link is not null) context.Links.Remove(agency.Link);

            var token = linkService.GenerateToken();

            var link = new Link
            {
                AgencyId = request.AgencyId,
                Token = token,
                ExpirationDate = DateTime.UtcNow.AddDays(7)
            };

            await context.Links.AddAsync(link, cancellationToken);

            agency.Link = link;

            await context.SaveChangesAsync(cancellationToken);

            await hubContext.Clients.Group($"Agency_{agency.AgencyId}")
                .SendAsync("LinkNotify", agency.AgencyId,
                    cancellationToken);

            return Unit.Value;
        }, cancellationToken);
    }
}