using Workflow.Application.Common.Mappings;
using Workflow.Core.Models;

namespace Workflow.Application.ViewModels;

public record ProjectViewModel : IMapWith<Project>
{
    public required int ProjectId { get; set; }

    public required int AgencyId { get; set; }

    public required string Name { get; set; }
}