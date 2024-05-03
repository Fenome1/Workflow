using MediatR;

namespace Workflow.Application.Features.Agencies.Commands.CreateDefault;

public record CreateDefaultAgencyCommand(int UserId) : IRequest<int>;