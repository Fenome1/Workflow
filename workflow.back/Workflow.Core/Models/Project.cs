namespace Workflow.Core.Models;

public partial class Project
{
    public int ProjectId { get; set; }

    public string Name { get; set; } = null!;

    public int AgencyId { get; set; }

    public virtual Agency Agency { get; set; } = null!;

    public virtual ICollection<Board> Boards { get; set; } = new List<Board>();
}
