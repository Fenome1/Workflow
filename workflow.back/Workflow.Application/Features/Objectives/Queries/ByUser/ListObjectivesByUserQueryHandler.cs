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
                cancellationToken: cancellationToken);

        if (!isUserExists)
            throw new NotFoundException(nameof(User), request.UserId);

        var objectives = await context.Agencies
            .AsNoTrackingWithIdentityResolution()
            .Where(a => a.AgencyId == request.AgencyId)
            .SelectMany(a => a.Projects)
            .SelectMany(p => p.Boards)
            .SelectMany(b => b.Columns)
            .SelectMany(c => c.Objectives)
            .Include(o => o.Users)
            .Include(o => o.Priority)
            .Where(o => o.Users.Any(u => u.UserId == request.UserId))
            .ProjectTo<ObjectiveViewModel>(mapper.ConfigurationProvider)
            .ToListAsync(cancellationToken: cancellationToken);

        return objectives;
    }
}