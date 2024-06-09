namespace Workflow.Core.Models;

public class Link
{
    public int LinkId { get; set; }

    public string Token { get; set; } = null!;

    public int AgencyId { get; set; }

    public DateTime ExpirationDate { get; set; }

    public DateTime CreationDate { get; set; }

    public int UsedCount { get; set; }

    public virtual Agency Agency { get; set; } = null!;
}