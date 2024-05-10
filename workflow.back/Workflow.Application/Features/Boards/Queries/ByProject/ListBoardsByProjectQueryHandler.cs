using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Workflow.Application.ViewModels;
using Workflow.Persistense.Context;

namespace Workflow.Application.Features.Boards.Queries.ByProject;

public sealed class ListBoardsByProjectQueryHandler(
    WorkflowDbContext context,
    IMapper mapper) : IRequestHandler<ListBoardsByProjectQuery, List<BoardViewModel>>
{
    public async Task<List<BoardViewModel>> Handle(ListBoardsByProjectQuery request,
        CancellationToken cancellationToken)
    {
        var boardsByProject = await context.Boards
            .Include(b => b.Columns)
            .ThenInclude(c => c.Objectives)
            .AsNoTrackingWithIdentityResolution()
            .Where(p => p.ProjectId == request.ProjectId)
            .ToListAsync(cancellationToken);

        return mapper.Map<List<BoardViewModel>>(boardsByProject);
    }
}