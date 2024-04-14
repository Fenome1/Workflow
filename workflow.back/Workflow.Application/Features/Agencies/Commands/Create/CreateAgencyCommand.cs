using MediatR;

namespace Workflow.Application.Features.Agencies.Commands.Create;

public record CreateAgencyCommand(int UserId) : IRequest<int>;