using MediatR;

namespace Workflow.Application.Features.Projects.Commands.Update;

public record UpdateProjectCommand : IRequest<int>
{
    public int ProjectId { get; set; }
    public string? Name { get; set; }
}