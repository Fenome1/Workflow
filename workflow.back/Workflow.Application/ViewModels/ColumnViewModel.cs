using AutoMapper;
using Workflow.Application.Common.Mappings;
using Column = Workflow.Core.Models.Column;

namespace Workflow.Application.ViewModels;

public record ColumnViewModel : IMapWith<Column>
{
    public required int ColumnId { get; set; }

    public required string Name { get; set; }

    public required int BoardId { get; set; }

    public required int Order { get; set; }
    
}