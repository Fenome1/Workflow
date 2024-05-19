using MediatR;

namespace Workflow.Application.Features.Agencies.Commands.Join;

public record JoinToAgencyCommand : IRequest<Unit>
{
    public int AgencyId { get; set; }
    public int UserId { get; set; }
}