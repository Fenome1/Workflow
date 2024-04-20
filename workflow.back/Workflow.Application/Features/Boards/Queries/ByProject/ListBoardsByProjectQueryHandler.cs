using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Workflow.Application.Common.Exceptions;
using Workflow.Application.ViewModels;
using Workflow.Core.Models;
using Workflow.Persistense.Context;

namespace Workflow.Application.Features.Boards.Queries.ByProject;

public class ListBoardsByProjectQueryHandler(
    WorkflowDbContext context,
    IMapper mapper) : IRequestHandler<ListBoardsByProjectQuery, List<BoardViewModel>>
{
    public async Task<List<BoardViewModel>> Handle(ListBoardsByProjectQuery request,
        CancellationToken cancellationToken)
    {
        var boardsByProject = await context.Boards
            .AsNoTrackingWithIdentityResolution()
            .Where(p => p.ProjectId == request.ProjectId)
            .ToListAsync(cancellationToken);

        if (boardsByProject is null || boardsByProject.Count < 1)
            throw new NotFoundException(nameof(List<Board>));

        return mapper.Map<List<BoardViewModel>>(boardsByProject);
    }
}