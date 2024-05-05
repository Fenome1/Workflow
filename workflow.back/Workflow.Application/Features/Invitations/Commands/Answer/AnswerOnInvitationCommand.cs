using MediatR;
using Workflow.Application.Common.Enums;

namespace Workflow.Application.Features.Invitations.Commands.Answer;

public record AnswerOnInvitationCommand : IRequest<Unit>
{
    public required int InvitationId { get; set; }
    public required AnswerType AnswerType { get; set; }
}