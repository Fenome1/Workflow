namespace Workflow.Core.Models;

public class Agency
{
    public int AgencyId { get; set; }

    public string Name { get; set; } = null!;

    public string? Description { get; set; }

    public int OwnerId { get; set; }

    public virtual ICollection<BackgroundImage> BackgroundImages { get; set; } = new List<BackgroundImage>();

    public virtual User Owner { get; set; } = null!;

    public virtual ICollection<Project> Projects { get; set; } = new List<Project>();

    public virtual ICollection<User> Users { get; set; } = new List<User>();
}