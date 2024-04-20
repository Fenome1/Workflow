using Workflow.Application.Common.Mappings;
using Workflow.Core.Models;

namespace Workflow.Application.ViewModels;

public record PriorityViewModel : IMapWith<Priority>
{
    public required int PriorityId { get; set; }

    public required string Name { get; set; }
}