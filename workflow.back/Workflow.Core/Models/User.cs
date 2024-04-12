namespace Workflow.Core.Models;

public partial class User
{
    public int UserId { get; set; }

    public string Email { get; set; } = null!;

    public string Password { get; set; } = null!;

    public string? FirstName { get; set; }

    public string? SecondName { get; set; }

    public string? MiddleName { get; set; }

    public virtual ICollection<Agency> AgenciesNavigation { get; set; } = new List<Agency>();

    public virtual ICollection<Agency> Agencies { get; set; } = new List<Agency>();

    public virtual ICollection<Objective> Tasks { get; set; } = new List<Objective>();
}
