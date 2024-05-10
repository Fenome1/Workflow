using MediatR;
using Microsoft.EntityFrameworkCore;
using Workflow.Application.Common.Exceptions;
using Workflow.Core.Models;
using Workflow.Persistense.Context;

namespace Workflow.Application.Features.Agencies.Commands.Create;

public sealed class CreateAgencyCommandHandler(
    WorkflowDbContext context,
    IMediator mediator) : IRequestHandler<CreateAgencyCommand, int>
{
    public async Task<int> Handle(CreateAgencyCommand request, CancellationToken cancellationToken)
    {
        return await context.WithTransactionAsync(async () =>
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
                Name = request.Name,
                Description = request.Description
            };

            await context.AddAsync(newAgency, cancellationToken);

            await context.SaveChangesAsync(cancellationToken);

            await mediator.CreateProjectAsync(newAgency, cancellationToken);

            return newAgency.AgencyId;
        }, cancellationToken);
    }
}