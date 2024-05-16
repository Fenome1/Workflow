using MediatR;

namespace Workflow.Application.Features.Objectives.Commands.Update;

public record UpdateObjectiveCommand : IRequest<int>
{
    public required int ObjectiveId { get; set; }
    public bool? Status { get; set; }
    public string? Name { get; set; }
    public int? PriorityId { get; set; }
    public DateTime? Deadline { get; set; }
    public bool IsDeadlineReset { get; set; } = false;
    public bool IsPriorityReset { get; set; } = false;
}