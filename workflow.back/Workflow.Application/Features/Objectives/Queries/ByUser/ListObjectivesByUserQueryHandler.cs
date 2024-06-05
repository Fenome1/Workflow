using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Workflow.Application.Common.Exceptions;
using Workflow.Application.ViewModels;
using Workflow.Core.Models;
using Workflow.Persistense.Context;

namespace Workflow.Application.Features.Objectives.Queries.ByUser;

public class ListObjectivesByUserQueryHandler(WorkflowDbContext context, IMapper mapper)
    : IRequestHandler<ListObjectivesByUserQuery, List<ObjectiveViewModel>>
{
    public async Task<List<ObjectiveViewModel>> Handle(ListObjectivesByUserQuery request,
        CancellationToken cancellationToken)
    {
        var isUserExists = await context.Users
            .AsNoTrackingWithIdentityResolution()
            .AnyAsync(u => u.UserId == request.UserId,
                cancellationToken);

        if (!isUserExists)
            throw new NotFoundException(nameof(User), request.UserId);

        var objectives = await context.Objectives
            .AsNoTrackingWithIdentityResolution()
            .Where(o => o.Column.Board.Project.Agency.AgencyId == request.AgencyId &&
                        o.Users.Any(u => u.UserId == request.UserId))
            .Include(o => o.Column.Board.Project.Agency)
            .Include(o => o.Users)
            .Include(o => o.Priority)
            .ProjectTo<ObjectiveViewModel>(mapper.ConfigurationProvider)
            .ToListAsync(cancellationToken);

        return objectives;
    }
}