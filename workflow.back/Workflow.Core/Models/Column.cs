namespace Workflow.Core.Models;

public partial class Column
{
    public int ColumnId { get; set; }

    public string Name { get; set; } = null!;

    public int BoardId { get; set; }

    public int Order { get; set; }

    public virtual Board Board { get; set; } = null!;

    public virtual ICollection<Objective> Objectives { get; set; } = new List<Objective>();
}
