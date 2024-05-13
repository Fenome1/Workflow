using MediatR;

namespace Workflow.Application.Features.Columns.Commands.Swap;

public record SwapColumnCommand : IRequest<Unit>
{
    public required int ColumnId { get; set; }
    public required int TargetOrder { get; set; }
}