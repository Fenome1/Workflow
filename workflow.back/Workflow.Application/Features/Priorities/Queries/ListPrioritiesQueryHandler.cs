using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Workflow.Application.Common.Exceptions;
using Workflow.Application.ViewModels;
using Workflow.Core.Models;
using Workflow.Persistense.Context;

namespace Workflow.Application.Features.Priorities.Queries;

public sealed class ListPrioritiesQueryHandler(WorkflowDbContext context, IMapper mapper)
    : IRequestHandler<ListPrioritiesQuery, List<PriorityViewModel>>
{
    public async Task<List<PriorityViewModel>> Handle(ListPrioritiesQuery request, CancellationToken cancellationToken)
    {
        var priorities = await context.Priorities
            .AsNoTrackingWithIdentityResolution()
            .ToListAsync(cancellationToken);

        if (priorities is null || !priorities.Any())
            throw new NotFoundException(nameof(List<Priority>));

        return mapper.Map<List<PriorityViewModel>>(priorities);
    }
}