namespace Workflow.Core.Models;

public class Objective
{
    public int ObjectiveId { get; set; }

    public string Name { get; set; } = null!;

    public int ColumnId { get; set; }

    public bool Status { get; set; }

    public DateTime CreationDate { get; set; }

    public DateTime? Deadline { get; set; }

    public int? PriorityId { get; set; }

    public int Order { get; set; }

    public virtual Column Column { get; set; } = null!;

    public virtual Priority? Priority { get; set; }

    public virtual ICollection<User> Users { get; set; } = new List<User>();
}