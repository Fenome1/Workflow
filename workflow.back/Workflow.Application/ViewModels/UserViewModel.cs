using Workflow.Application.Common.Mappings;
using Workflow.Core.Models;

namespace Workflow.Application.ViewModels;

public record UserViewModel : IMapWith<User>
{
    public required int UserId { get; set; }
    public required string Email { get; set; }
    public string? Name { get; set; }
    public byte[]? AvatarImage { get; set; }
}