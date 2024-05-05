using MediatR;
using Workflow.Application.ViewModels;

namespace Workflow.Application.Features.Invitations.Queries.ByAgency;

public record ListAgencyInvitationsQuery(int AgencyId) : IRequest<List<InvitationViewModel>>;