using AutoMapper;
using Workflow.Application.Common.Mappings;
using Workflow.Core.Models;

namespace Workflow.Application.ViewModels;

public record BoardViewModel : IMapWith<Board>
{
    public required int BoardId { get; set; }
    public required string Name { get; set; }
    public required int ProjectId { get; set; }
    public string? Description { get; set; }
    public int? ColumnsCount { get; set; }
    public int? ObjectivesCount { get; set; }

    public void Map(Profile profile)
    {
        profile.CreateMap<Board, BoardViewModel>()
            .ForMember(vm => vm.ColumnsCount,
                opt =>
                    opt.MapFrom(b => b.Columns.Count))
            .ForMember(vm => vm.ObjectivesCount,
                opt =>
                    opt.MapFrom(b => b.Columns.Sum(c => c.Objectives.Count)));
    }
}