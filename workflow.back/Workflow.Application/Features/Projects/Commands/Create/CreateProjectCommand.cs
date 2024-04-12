using MediatR;
using Workflow.Application.Common.Mappings;
using Workflow.Core.Models;

namespace Workflow.Application.Features.Projects.Commands.Create;

public record CreateProjectCommand : IRequest<int>, IMapWith<Project>
{
    public required int AgencyId { get; init; }
    public required string Name { get; init; }
}