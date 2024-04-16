using MediatR;

namespace Workflow.Application.Features.Boards.Commands.Create;

public record CreateBoardCommand : IRequest<int>
{
    public required string Name { get; set; }
    public required int ProjectId { get; set; }
}