using MediatR;
using Microsoft.EntityFrameworkCore;
using Workflow.Application.Common.Exceptions;
using Workflow.Persistense.Context;

namespace Workflow.Application.Features.Projects.Commands.Delete;

public sealed class DeleteProjectCommandHandler(WorkflowDbContext context) : IRequestHandler<DeleteProjectCommand, Unit>
{
    public async Task<Unit> Handle(DeleteProjectCommand request, CancellationToken cancellationToken)
    {
        var deletingProject = await context.Projects
            .AsNoTrackingWithIdentityResolution()
            .FirstOrDefaultAsync(p => p.ProjectId == request.ProjectId,
                cancellationToken);

        if (deletingProject is null)
            throw new NotFoundException(nameof(deletingProject));

        context.Projects.Remove(deletingProject);
        await context.SaveChangesAsync(cancellationToken);

        return Unit.Value;
    }
}