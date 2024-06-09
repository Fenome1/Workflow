using MediatR;
using Microsoft.AspNetCore.SignalR;
using Workflow.Application.Common.Exceptions;
using Workflow.Application.Hubs;
using Workflow.Core.Models;
using Workflow.Persistense.Context;

namespace Workflow.Application.Features.Agencies.Commands.Update;

public sealed class UpdateAgencyCommandHandler(WorkflowDbContext context, IHubContext<NotifyHub> hubContext)
    : IRequestHandler<UpdateAgencyCommand, int>
{
    public async Task<int> Handle(UpdateAgencyCommand request, CancellationToken cancellationToken)
    {
        var agency = await context.Agencies
            .FindAsync(request.AgencyId);

        if (agency is null)
            throw new NotFoundException(nameof(Agency), request.AgencyId);

        if (!string.IsNullOrWhiteSpace(request.Name))
            agency.Name = request.Name;

        if (!string.IsNullOrWhiteSpace(request.Description))
            agency.Description = request.Description;

        await context.SaveChangesAsync(cancellationToken);

        await hubContext.Clients.Group($"Agency_{agency.AgencyId}")
            .SendAsync("AgencyNotify", agency.AgencyId,
                cancellationToken);

        return agency.AgencyId;
    }
}