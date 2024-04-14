using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Workflow.Application.Common.Exceptions;
using Workflow.Core.Models;
using Workflow.Persistense.Context;

namespace Workflow.Application.Features.Projects.Commands.Create;

public sealed class CreateProjectCommandHandler(
    WorkflowDbContext context,
    IMapper mapper) : IRequestHandler<CreateProjectCommand, int>
{
    public async Task<int> Handle(CreateProjectCommand request, CancellationToken cancellationToken)
    {
        var isAgencyExists = await context.Agencies
            .AsNoTrackingWithIdentityResolution()
            .AnyAsync(a => a.AgencyId == request.AgencyId,
                cancellationToken);

        if (!isAgencyExists)
            throw new NotFoundException(nameof(Agencies));

        var newProject = mapper.Map<Project>(request);

        await context.Projects.AddAsync(newProject, cancellationToken);

        await context.SaveChangesAsync(cancellationToken);

        return newProject.ProjectId;
    }
}