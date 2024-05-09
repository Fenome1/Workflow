namespace Workflow.Core.Models;

public partial class Invitation
{
    public int InvitationId { get; set; }

    public int AgencyId { get; set; }

    public int UserId { get; set; }

    public int InvitationStatusId { get; set; }

    public virtual Agency Agency { get; set; } = null!;

    public virtual InvitationStatus InvitationStatus { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
