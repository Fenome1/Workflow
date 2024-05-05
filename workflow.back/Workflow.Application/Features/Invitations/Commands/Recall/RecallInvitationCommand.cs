using MediatR;

namespace Workflow.Application.Features.Invitations.Commands.Recall;

public record RecallInvitationCommand(int InvitationId) : IRequest<Unit>;