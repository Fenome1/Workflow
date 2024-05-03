namespace Workflow.Core.Models;

public class BackgroundImage
{
    public int ImageId { get; set; }

    public byte[] Image { get; set; } = null!;

    public int AgencyId { get; set; }

    public virtual Agency Agency { get; set; } = null!;
}