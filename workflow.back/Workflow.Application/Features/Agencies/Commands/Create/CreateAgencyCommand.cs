using MediatR;

namespace Workflow.Application.Features.Agencies.Commands.Create;

public record CreateAgencyCommand : IRequest<int>
{
    public required int UserId { get; set; }
    public required string Name { get; set; }
    public string? Description { get; set; }
}