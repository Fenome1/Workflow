using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Workflow.Application.ViewModels;
using Workflow.Persistense.Context;

namespace Workflow.Application.Features.Columns.Queries.ByBoard;

public sealed class ListColumnsByBoardQueryHandler(
    WorkflowDbContext context,
    IMapper mapper)
    : IRequestHandler<ListColumnsByBoardQuery, List<ColumnViewModel>>
{
    public async Task<List<ColumnViewModel>> Handle(ListColumnsByBoardQuery request,
        CancellationToken cancellationToken)
    {
        var columnsByBoard = await context.Columns
            .AsNoTrackingWithIdentityResolution()
            .Where(c => c.BoardId == request.BoardId)
            .OrderBy(c => c.Order)
            .ToListAsync(cancellationToken);

        return mapper.Map<List<ColumnViewModel>>(columnsByBoard);
    }
}