namespace Workflow.Core.Models;

public partial class User
{
    public int UserId { get; set; }

    public string Email { get; set; } = null!;

    public string Password { get; set; } = null!;

    public string? Name { get; set; }

    public byte[]? AvatarImage { get; set; }

    public virtual ICollection<Agency> AgenciesNavigation { get; set; } = new List<Agency>();

    public virtual ICollection<Invitation> Invitations { get; set; } = new List<Invitation>();

    public virtual RefreshToken? RefreshToken { get; set; }

    public virtual ICollection<Agency> Agencies { get; set; } = new List<Agency>();

    public virtual ICollection<Objective> Objectives { get; set; } = new List<Objective>();
}
