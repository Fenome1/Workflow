using MediatR;
using Workflow.Application.Common.Mappings;
using Workflow.Core.Models;

namespace Workflow.Application.Features.Agencies.Commands.Update;

public record UpdateAgencyCommand : IRequest<int>, IMapWith<Agency>
{
    public required int AgencyId { get; init; }
    public string? Name { get; set; }
    public string? Description { get; set; }
}