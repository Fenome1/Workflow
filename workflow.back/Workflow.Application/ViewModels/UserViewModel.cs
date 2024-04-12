using Workflow.Application.Common.Mappings;
using Workflow.Core.Models;

namespace Workflow.Application.ViewModels;

public record UserViewModel : IMapWith<User>
{
    public required int UserId { get; set; }
    public required string Email { get; set; }
    public string? FirstName { get; set; }
    public string? SecondName { get; set; }
    public string? MiddleName { get; set; }
}