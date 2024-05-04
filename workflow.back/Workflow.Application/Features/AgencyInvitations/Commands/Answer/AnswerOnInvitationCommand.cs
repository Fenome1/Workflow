using MediatR;
using Workflow.Application.Common.Enums;

namespace Workflow.Application.Features.AgencyInvitations.Commands.Answer;

public record AnswerOnInvitationCommand : IRequest<Unit>
{
    public required int AgencyInvitationId { get; set; }
    public required AnswerType AnswerType { get; set; }
}