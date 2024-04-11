using AutoMapper;

namespace Workflow.Application.Common.Mappings;

public interface IMapWith<T>
{
    void Map(Profile profile)
    {
        profile.CreateMap(typeof(T), GetType())
            .ReverseMap();
    }
}