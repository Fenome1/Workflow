using MediatR;
using Workflow.Application.ViewModels;

namespace Workflow.Application.Features.Users.Commands.Refresh;

public record RefreshCommand : IRequest<AuthResultViewModel>
{
    public required string AccessToken { get; set; }
    public required string RefreshToken { get; set; }
}