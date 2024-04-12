using MediatR;
using Workflow.Application.ViewModels;

namespace Workflow.Application.Features.Agencies.Queries.ByUser;

public record ListAgenciesByUserQuery(int UserId) : IRequest<List<AgencyViewModel>>;
