using MediatR;

namespace Workflow.Application.Features.Agencies.Commands.Delete;

public record DeleteAgencyCommand(int AgencyId) : IRequest<Unit>;