using Workflow.Application.Common.Mappings;
using Workflow.Core.Models;

namespace Workflow.Application.ViewModels;

public record ObjectiveViewModel : IMapWith<Objective>
{
    public required int ObjectiveId { get; set; }

    public required string Name { get; set; }

    public required int ColumnId { get; set; }

    public required bool Status { get; set; }

    public required int Order { get; set; }

    public DateTime CreationDate { get; set; }

    public DateOnly? Deadline { get; set; }

    public PriorityViewModel? Priority { get; set; }

    public List<UserViewModel>? Users { get; set; }
}