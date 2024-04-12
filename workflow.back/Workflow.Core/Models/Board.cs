namespace Workflow.Core.Models;

public partial class Board
{
    public int BoardId { get; set; }

    public string Name { get; set; } = null!;

    public int ProjectId { get; set; }

    public virtual ICollection<Column> Columns { get; set; } = new List<Column>();

    public virtual Project Project { get; set; } = null!;
}
