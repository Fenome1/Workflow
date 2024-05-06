using MediatR;

namespace Workflow.Application.Features.Agencies.Commands.FireUser;

public record FireUserFromAgencyCommand(int AgencyId, int UserId) : IRequest<Unit>;
