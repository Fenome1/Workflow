using MediatR;
using Workflow.Application.ViewModels;

namespace Workflow.Application.Features.Users.Queries.Get;

public record GetUserByIdQuery(int UserId) : IRequest<UserViewModel>;