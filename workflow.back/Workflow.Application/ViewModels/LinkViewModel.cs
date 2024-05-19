using Workflow.Application.Common.Mappings;
using Workflow.Core.Models;

namespace Workflow.Application.ViewModels;

public record LinkViewModel : IMapWith<Link>
{
    public required int LinkId { get; set; }
    public required string Value { get; set; }
    public required int AgencyId { get; set; }
    public required DateTime ExpirationDate { get; set; }
    public required DateTime CreationDate { get; set; }
    public required int UsedCount { get; set; }
}