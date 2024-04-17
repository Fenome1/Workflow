using MediatR;

namespace Workflow.Application.Features.Columns.Commands.Swap;

public record SwapColumnOrderCommand : IRequest<Unit>
{
    public required int FirstChildId { get; set; }
    public required int SecondChildId { get; set; }
}