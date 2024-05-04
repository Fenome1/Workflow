using MediatR;
using Workflow.Application.Common.Mappings;
using Workflow.Core.Models;

namespace Workflow.Application.Features.AgencyInvitations.Commands.Send;

public record SendInvitationCommand : IRequest<int>, IMapWith<AgencyInvitation>
{
    public required string Email { get; set; }
    public required int AgencyId { get; set; }
}