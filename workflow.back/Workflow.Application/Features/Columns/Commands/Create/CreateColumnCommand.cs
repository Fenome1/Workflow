using MediatR;
using Workflow.Application.Common.Mappings;
using Column = Workflow.Core.Models.Column;

namespace Workflow.Application.Features.Columns.Commands.Create;

public class CreateColumnCommand : IRequest<int>, IMapWith<Column>
{
    public required int BoardId { get; set; }
    public required string Name { get; set; }
}