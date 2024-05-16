using MediatR;

namespace Workflow.Application.Features.Objectives.Commands.Swap;

public record SwapObjectiveCommand : IRequest<Unit>
{
    public required int ColumnId { get; set; }
    public required int ObjectiveId { get; set; }
    public required int TargetOrder { get; set; }
}