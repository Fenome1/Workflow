using MediatR;

namespace Workflow.Application.Features.Objectives.Commands.Delete;

public record DeleteObjectiveCommand(int ObjectiveId) : IRequest<Unit>;
