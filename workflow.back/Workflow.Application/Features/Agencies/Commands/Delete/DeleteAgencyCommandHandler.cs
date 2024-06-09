using MediatR;
using Microsoft.AspNetCore.SignalR;
using Workflow.Application.Common.Enums.Static;
using Workflow.Application.Common.Exceptions;
using Workflow.Application.Hubs;
using Workflow.Persistense.Context;

namespace Workflow.Application.Features.Agencies.Commands.Delete;

public sealed class DeleteAgencyCommandHandler(WorkflowDbContext context, IHubContext<NotifyHub> hubContext)
    : IRequestHandler<DeleteAgencyCommand, Unit>
{
    public async Task<Unit> Handle(DeleteAgencyCommand request, CancellationToken cancellationToken)
    {
        var deletingAgency = await context.Agencies
            .FindAsync(request.AgencyId);

        if (deletingAgency is null)
            throw new NotFoundException(nameof(deletingAgency));

        context.Agencies.Remove(deletingAgency);
        await context.SaveChangesAsync(cancellationToken);

        await hubContext.Clients.Group(SignalGroups.AgencyGroupWithId(deletingAgency.AgencyId))
            .SendAsync(NotifyTypes.AgencyNotify, deletingAgency.AgencyId,
                cancellationToken);

        return Unit.Value;
    }
}