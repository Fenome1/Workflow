namespace Workflow.Core.Models;

public class InvitationStatus
{
    public int InvitationStatusId { get; set; }

    public string Name { get; set; } = null!;

    public virtual ICollection<AgencyInvitation> AgencyInvitations { get; set; } = new List<AgencyInvitation>();
}