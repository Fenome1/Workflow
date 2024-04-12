using Workflow.Application.Common.Mappings;
using Workflow.Core.Models;

namespace Workflow.Application.ViewModels;

public class AgencyViewModel : IMapWith<Agency>
{
    public int AgencyId { get; set; }

    public string Name { get; set; } = null!;

    public string? Description { get; set; }

    public int OwnerId { get; set; }
}