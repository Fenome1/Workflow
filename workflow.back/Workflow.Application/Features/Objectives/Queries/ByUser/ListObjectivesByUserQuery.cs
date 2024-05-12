using MediatR;
using Workflow.Application.ViewModels;

namespace Workflow.Application.Features.Objectives.Queries.ByUser;

public record ListObjectivesByUserQuery(int AgencyId, int UserId) : IRequest<List<ObjectiveViewModel>>;
