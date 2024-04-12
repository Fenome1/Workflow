using MediatR;
using Workflow.Application.Common.Exceptions;
using Workflow.Persistense.Context;

namespace Workflow.Application.Features.Projects.Commands.Update;

public class UpdateProjectCommandHandler(WorkflowDbContext context) : IRequestHandler<UpdateProjectCommand, int>
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

        return editingProject.ProjectId;
    }
}