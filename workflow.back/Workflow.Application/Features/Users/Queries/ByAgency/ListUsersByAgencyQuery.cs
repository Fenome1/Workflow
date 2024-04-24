using MediatR;
using Workflow.Application.ViewModels;

namespace Workflow.Application.Features.Users.Queries.ByAgency;

public record ListUsersByAgencyQuery(int AgencyId) : IRequest<List<UserViewModel>>;