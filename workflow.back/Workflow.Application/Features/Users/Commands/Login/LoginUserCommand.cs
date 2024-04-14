using MediatR;
using Workflow.Application.ViewModels;

namespace Workflow.Application.Features.Users.Commands.Login;

public record LoginUserCommand : IRequest<AuthResultViewModel>
{
    public required string Email { get; set; }
    public required string Password { get; set; }
}