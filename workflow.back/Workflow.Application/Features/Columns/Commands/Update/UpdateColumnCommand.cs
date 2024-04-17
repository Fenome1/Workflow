using MediatR;

namespace Workflow.Application.Features.Columns.Commands.Update;

public record UpdateColumnCommand : IRequest<int>
{
    public required int ColumnId { get; set; }
    public string? Name { get; set; }
    public int? Order { get; set; }
}