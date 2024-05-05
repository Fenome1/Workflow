using Workflow.Application.Common.Mappings;
using Workflow.Core.Models;

namespace Workflow.Application.ViewModels;

public record InvitationStatusViewModel : IMapWith<InvitationStatus>
{
    public required int InvitationStatusId { get; set; }

    public required string Name { get; set; }
}