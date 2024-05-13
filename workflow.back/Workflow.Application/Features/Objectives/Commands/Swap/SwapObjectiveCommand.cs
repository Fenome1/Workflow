using MediatR;
using Workflow.Application.Common.Mappings;
using Workflow.Core.Models;

namespace Workflow.Application.Features.Objectives.Commands.Swap;

public record SwapObjectiveCommand : IRequest<Unit>, IMapWith<Objective>
{
    public required int ObjectiveId { get; set; }
    public required int ColumnId { get; set; }
    public required int Order { get; set; }
}