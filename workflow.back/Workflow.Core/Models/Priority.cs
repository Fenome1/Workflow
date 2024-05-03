namespace Workflow.Core.Models;

public class Priority
{
    public int PriorityId { get; set; }

    public string Name { get; set; } = null!;

    public virtual ICollection<Objective> Objectives { get; set; } = new List<Objective>();
}