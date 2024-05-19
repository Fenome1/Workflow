using MediatR;

namespace Workflow.Application.Features.Links.Command.Refresh;

public record RefreshAgencyLinkCommand(int AgencyId) : IRequest<Unit>;