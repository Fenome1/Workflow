using MediatR;

namespace Workflow.Application.Features.Boards.Commands.Update;

public record UpdateBoardCommand : IRequest<int>
{
    public required int BoardId { get; set; }
    public required string Name { get; set; }
    public string? Description { get; set; }
}