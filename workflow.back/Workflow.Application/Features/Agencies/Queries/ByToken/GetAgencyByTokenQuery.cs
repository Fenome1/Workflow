using MediatR;
using Workflow.Application.ViewModels;

namespace Workflow.Application.Features.Agencies.Queries.ByToken;

public record GetAgencyByTokenQuery(string Token) : IRequest<AgencyViewModel>;