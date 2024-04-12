using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Workflow.Application.Common.Exceptions;
using Workflow.Core.Models;
using Workflow.Persistense.Context;

namespace Workflow.Application.Features.Agencies.Commands.Create;

public sealed class CreateAgencyCommandHandler(WorkflowDbContext context)
    : IRequestHandler<CreateAgencyCommand, int>
{
    public async Task<int> Handle(CreateAgencyCommand request, CancellationToken cancellationToken)
    {
        var isUserExists = await context.Users
            .AnyAsync(u => u.UserId == request.UserId,
                cancellationToken: cancellationToken);

        if (!isUserExists)
            throw new NotFoundException(typeof(User).ToString());

        var newAgency = new Agency()
        {
            OwnerId = request.UserId,
            Name = "Моё агенство"
        };
        
        await context.Agencies.AddAsync(newAgency, cancellationToken);
        await context.SaveChangesAsync(cancellationToken);

        return newAgency.AgencyId;
    }
}