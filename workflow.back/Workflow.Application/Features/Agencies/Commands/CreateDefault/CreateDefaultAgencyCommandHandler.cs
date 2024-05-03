using MediatR;
using Microsoft.EntityFrameworkCore;
using Workflow.Application.Common.Exceptions;
using Workflow.Core.Models;
using Workflow.Persistense.Context;

namespace Workflow.Application.Features.Agencies.Commands.CreateDefault;

public sealed class CreateDefaultAgencyCommandHandler(
    WorkflowDbContext context,
    IMediator mediator)
    : IRequestHandler<CreateDefaultAgencyCommand, int>
{
    public async Task<int> Handle(CreateDefaultAgencyCommand request, CancellationToken cancellationToken)
    {
        var isUserExists = await context.Users
            .AsNoTrackingWithIdentityResolution()
            .AnyAsync(u => u.UserId == request.UserId,
                cancellationToken);

        if (!isUserExists)
            throw new NotFoundException(nameof(User), request.UserId);

        var newAgency = new Agency
        {
            OwnerId = request.UserId,
            Name = "Моё агентство"
        };

        await context.AddAsync(newAgency, cancellationToken);

        await context.SaveChangesAsync(cancellationToken);

        await mediator.CreateDefaultProject(cancellationToken, newAgency);

        return newAgency.AgencyId;
    }
}