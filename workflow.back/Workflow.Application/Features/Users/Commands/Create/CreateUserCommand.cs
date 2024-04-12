using MediatR;
using Workflow.Application.Common.Mappings;
using Workflow.Core.Models;

namespace Workflow.Application.Features.Users.Commands.Create;

public record CreateUserCommand : IRequest<int>, IMapWith<User>
{
    public string Email { get; set; }
    public string Password { get; set; }
}