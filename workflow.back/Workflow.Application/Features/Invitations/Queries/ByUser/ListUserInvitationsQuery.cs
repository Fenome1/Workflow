using MediatR;
using Workflow.Application.ViewModels;

namespace Workflow.Application.Features.Invitations.Queries.ByUser;

public record ListUserInvitationsQuery(int UserId) : IRequest<List<InvitationViewModel>>;