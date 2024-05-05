using AutoMapper;
using Workflow.Application.Common.Mappings;
using Workflow.Core.Models;

namespace Workflow.Application.ViewModels;

public record InvitationViewModel : IMapWith<Invitation>
{
    public required int InvitationId { get; set; }
    public required int AgencyId { get; set; }
    public required int UserId { get; set; }
    public required InvitationStatusViewModel InvitationStatus { get; set; }
    public required UserViewModel User { get; set; }
    public required string AgencyName { get; set; }

    public void Map(Profile profile)
    {
        profile.CreateMap<Invitation, InvitationViewModel>()
            .ForMember(vm => vm.AgencyName,
                opt =>
                    opt.MapFrom(b => b.Agency.Name));
    }
}