namespace Workflow.Application.ViewModels;

public class AuthResultViewModel
{
    public required string AccessToken { get; set; }
    public required string RefreshToken { get; set; }
    public required UserViewModel User { get; set; }
}