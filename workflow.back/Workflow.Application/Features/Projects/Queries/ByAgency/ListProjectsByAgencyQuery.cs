using MediatR;
using Workflow.Application.ViewModels;

namespace Workflow.Application.Features.Projects.Queries.ByAgency;

public record ListProjectsByAgencyQuery(int AgencyId) : IRequest<List<ProjectViewModel>>;