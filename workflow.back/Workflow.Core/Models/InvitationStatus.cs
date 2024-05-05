namespace Workflow.Core.Models;

public class InvitationStatus
{
    public int InvitationStatusId { get; set; }

    public string Name { get; set; } = null!;

    public virtual ICollection<Invitation> Invitations { get; set; } = new List<Invitation>();
}