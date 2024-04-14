using MediatR;

namespace Workflow.Application.Features.Projects.Commands.Delete;

public record DeleteProjectCommand(int ProjectId) : IRequest<Unit>;