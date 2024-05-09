namespace Workflow.Core.Models;

public partial class RefreshToken
{
    public int RefreshTokenId { get; set; }

    public int UserId { get; set; }

    public string Token { get; set; } = null!;

    public DateTime ExpirationDate { get; set; }

    public virtual User User { get; set; } = null!;
}
