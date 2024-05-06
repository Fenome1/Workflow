using MediatR;
using Microsoft.EntityFrameworkCore;
using Workflow.Application.Common.Exceptions;
using Workflow.Core.Models;
using Workflow.Persistense.Context;

namespace Workflow.Application.Features.Agencies.Commands.FireUser;

public class FireUserFromAgencyCommandHandler(WorkflowDbContext context) : IRequestHandler<FireUserFromAgencyCommand, Unit>
{
    public async Task<Unit> Handle(FireUserFromAgencyCommand request, CancellationToken cancellationToken)
    {
        var agency = await context.Agencies
            .Include(a => a.Users)
            .FirstOrDefaultAsync(a => a.AgencyId == request.AgencyId, 
                cancellationToken: cancellationToken);
        
        if (agency is null)
            throw new NotFoundException(nameof(Agency), request.AgencyId);
        
        var user = await context.Users.FindAsync(request.UserId);
        
        if (user is null)
            throw new NotFoundException(nameof(User), request.UserId);

        var userInAgency = agency.Users
            .FirstOrDefault(u => u.UserId == user.UserId);
        
        if (userInAgency is null)
            throw new NotFoundException($"Пользователь: {user.UserId} не состоит в агентстве: {agency.AgencyId}");
        
        agency.Users.Remove(userInAgency);
        await context.SaveChangesAsync(cancellationToken);

        return Unit.Value;
    }
}