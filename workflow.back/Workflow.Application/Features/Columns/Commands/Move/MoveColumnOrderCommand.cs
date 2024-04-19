using MediatR;

namespace Workflow.Application.Features.Columns.Commands.Move;

public record MoveColumnOrderCommand : IRequest<Unit>
{
    public required int ColumnId { get; init; } 
    public required int NewPosition { get; init; }
}