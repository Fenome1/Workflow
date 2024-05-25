namespace Workflow.Application.ViewModels;

public record UserAgenciesObjectivesViewModel
{
    public required string AgencyName { get; set; }
    public required List<ObjectiveViewModel> Objectives { get; set; }
}