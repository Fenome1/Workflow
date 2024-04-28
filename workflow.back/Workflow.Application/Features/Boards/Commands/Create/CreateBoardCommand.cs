using MediatR;
using Workflow.Application.Common.Mappings;
using Workflow.Core.Models;

namespace Workflow.Application.Features.Boards.Commands.Create;

public record CreateBoardCommand : IRequest<int>, IMapWith<Board>
{
    public required int ProjectId { get; set; }
    public required string Name { get; set; }
    public string? Description { get; set; }
}