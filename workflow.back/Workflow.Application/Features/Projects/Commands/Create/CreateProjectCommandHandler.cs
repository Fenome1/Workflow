using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Workflow.Application.Common.Enums.Static;
using Workflow.Application.Common.Exceptions;
using Workflow.Application.Hubs;
using Workflow.Core.Models;
using Workflow.Persistense.Context;

namespace Workflow.Application.Features.Projects.Commands.Create;

public sealed class CreateProjectCommandHandler(
    WorkflowDbContext context,
    IHubContext<NotifyHub> hubContext,
    IMapper mapper) : IRequestHandler<CreateProjectCommand, int>
{
    public async Task<int> Handle(CreateProjectCommand request, CancellationToken cancellationToken)
    {
        var agency = await context.Agencies
            .AsNoTrackingWithIdentityResolution()
            .FirstOrDefaultAsync(a => a.AgencyId == request.AgencyId,
                cancellationToken);

        if (agency is null)
            throw new NotFoundException(nameof(Agencies));

        var newProject = mapper.Map<Project>(request);

        await context.Projects.AddAsync(newProject, cancellationToken);

        await context.SaveChangesAsync(cancellationToken);

        await hubContext.Clients.Group(
                SignalGroups.AgencyGroupWithId(agency.AgencyId))
            .SendAsync(NotifyTypes.ProjectNotify, agency.AgencyId,
                cancellationToken);

        return newProject.ProjectId;
    }
}