using MediatR;
using Microsoft.EntityFrameworkCore;
using Workflow.Application.Common.Exceptions;
using Workflow.Application.Features.Projects.Commands.Create;
using Workflow.Core.Models;
using Workflow.Persistense.Context;

namespace Workflow.Application.Features.Agencies.Commands.Create;

public sealed class CreateAgencyCommandHandler(
    WorkflowDbContext context,
    IMediator mediator)
    : IRequestHandler<CreateAgencyCommand, int>
{
    public async Task<int> Handle(CreateAgencyCommand request, CancellationToken cancellationToken)
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
            Name = "Моё агенство"
        };

        await context.AddAsync(newAgency, cancellationToken);

        await context.SaveChangesAsync(cancellationToken);

        await CreateDefaultProject(cancellationToken, newAgency);

        return newAgency.AgencyId;
    }

    private async Task CreateDefaultProject(CancellationToken cancellationToken, Agency newAgency)
    {
        await mediator.Send(new CreateProjectCommand
        {
            AgencyId = newAgency.AgencyId,
            Name = "Проект 1"
        }, cancellationToken);
    }
}