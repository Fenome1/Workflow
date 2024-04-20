using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Workflow.Application.Common.Exceptions;
using Workflow.Application.ViewModels;
using Workflow.Core.Models;
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

        if (columnsByBoard is null || columnsByBoard.Count < 1)
            throw new NotFoundException(nameof(List<Column>));

        return mapper.Map<List<ColumnViewModel>>(columnsByBoard);
    }
}