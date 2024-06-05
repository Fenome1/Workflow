using MediatR;
using Workflow.Application.ViewModels;

namespace Workflow.Application.Features.Links.Queries.ByAgency;

public record GetLinkByAgencyQuery(int AgencyId) : IRequest<LinkViewModel?>;