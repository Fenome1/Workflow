using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Workflow.Application.Common.Exceptions;
using Workflow.Application.ViewModels;
using Workflow.Core.Models;
using Workflow.Persistense.Context;

namespace Workflow.Application.Features.Users.Queries.Get;

public class GetUserByIdQueryHandler(WorkflowDbContext context, IMapper mapper)
    : IRequestHandler<GetUserByIdQuery, UserViewModel>
{
    public async Task<UserViewModel> Handle(GetUserByIdQuery request, CancellationToken cancellationToken)
    {
        var user = await context
            .Users
            .AsNoTrackingWithIdentityResolution()
            .FirstOrDefaultAsync(u => u.UserId == request.UserId,
                cancellationToken);

        if (user is null)
            throw new NotFoundException(nameof(User), request.UserId);

        return mapper.Map<UserViewModel>(user);
    }
}