using MediatR;
using Workflow.Application.Common.Mappings;
using Workflow.Core.Models;

namespace Workflow.Application.Features.Objectives.Commands.Create;

public record CreateObjectiveCommand : IRequest<int>, IMapWith<Objective>
{
    public required string Name { get; set; }
    public required int ColumnId { get; set; }
}