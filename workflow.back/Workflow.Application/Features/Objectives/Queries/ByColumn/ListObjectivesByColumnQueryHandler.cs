using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Workflow.Application.Common.Exceptions;
using Workflow.Application.ViewModels;
using Workflow.Core.Models;
using Workflow.Persistense.Context;

namespace Workflow.Application.Features.Objectives.Queries.ByColumn;

public sealed class ListObjectivesByColumnQueryHandler(
    WorkflowDbContext context,
    IMapper mapper) : IRequestHandler<ListObjectivesByColumnQuery, List<ObjectiveViewModel>>
{
    public async Task<List<ObjectiveViewModel>> Handle(ListObjectivesByColumnQuery request,
        CancellationToken cancellationToken)
    {
        var objectivesByColumn = await context.Objectives
            .Include(o => o.Priority)
            .Include(o => o.Users)
            .AsNoTrackingWithIdentityResolution()
            .Where(c => c.ColumnId == request.ColumnId)
            .OrderBy(c => c.Order)
            .ToListAsync(cancellationToken);

        if (objectivesByColumn is null || objectivesByColumn.Count < 1)
            throw new NotFoundException(nameof(List<Objective>));

        return mapper.Map<List<ObjectiveViewModel>>(objectivesByColumn);
    }
}