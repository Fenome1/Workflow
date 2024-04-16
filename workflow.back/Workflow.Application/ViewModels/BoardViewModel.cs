using Workflow.Application.Common.Mappings;
using Workflow.Core.Models;

namespace Workflow.Application.ViewModels;

public record BoardViewModel : IMapWith<Board>
{
    public required int BoardId { get; set; }
    public required string Name { get; set; }
    public required int ProjectId { get; set; }
}