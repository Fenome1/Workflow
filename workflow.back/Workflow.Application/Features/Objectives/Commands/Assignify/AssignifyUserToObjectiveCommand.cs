using MediatR;
using Workflow.Application.Common.Enums;

namespace Workflow.Application.Features.Objectives.Commands.Assignify;

public record AssignifyUserToObjectiveCommand : IRequest<Unit>
{
    public required int UserId { get; set; }
    public required int ObjectiveId { get; set; }

    public required AssignifyType AssignifyType { get; set; }
}