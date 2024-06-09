using MediatR;
using Microsoft.AspNetCore.SignalR;
using Workflow.Application.Common.Enums.Static;
using Workflow.Application.Common.Exceptions;
using Workflow.Application.Hubs;
using Workflow.Persistense.Context;

namespace Workflow.Application.Features.Projects.Commands.Update;

public sealed class UpdateProjectCommandHandler(WorkflowDbContext context, IHubContext<NotifyHub> hubContext)
    : IRequestHandler<UpdateProjectCommand, int>
{
    public async Task<int> Handle(UpdateProjectCommand request, CancellationToken cancellationToken)
    {
        var editingProject = await context.Projects
            .FindAsync(request.ProjectId);

        if (editingProject is null)
            throw new NotFoundException(nameof(editingProject));

        if (!string.IsNullOrWhiteSpace(request.Name))
            editingProject.Name = request.Name;

        await context.SaveChangesAsync(cancellationToken);

        await hubContext.Clients.Group(
                SignalGroups.AgencyGroupWithId(editingProject.AgencyId))
            .SendAsync(NotifyTypes.ProjectNotify, editingProject.AgencyId,
                cancellationToken);

        return editingProject.ProjectId;
    }
}