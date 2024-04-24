using MediatR;
using Workflow.Application.ViewModels;

namespace Workflow.Application.Features.Priorities.Queries;

public class ListPrioritiesQuery : IRequest<List<PriorityViewModel>>;