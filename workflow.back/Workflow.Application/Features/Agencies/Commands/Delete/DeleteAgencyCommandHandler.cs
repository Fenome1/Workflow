using MediatR;
using Workflow.Application.Common.Exceptions;
using Workflow.Persistense.Context;

namespace Workflow.Application.Features.Agencies.Commands.Delete;

public sealed class DeleteAgencyCommandHandler(WorkflowDbContext context) : IRequestHandler<DeleteAgencyCommand, Unit>
{
    public async Task<Unit> Handle(DeleteAgencyCommand request, CancellationToken cancellationToken)
    {
        var deletingAgency = await context.Agencies
            .FindAsync(request.AgencyId);

        if (deletingAgency is null)
            throw new NotFoundException(nameof(deletingAgency));

        context.Agencies.Remove(deletingAgency);
        await context.SaveChangesAsync(cancellationToken);

        return Unit.Value;
    }
}