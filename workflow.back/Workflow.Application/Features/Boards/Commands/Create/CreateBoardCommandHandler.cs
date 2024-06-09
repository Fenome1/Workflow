using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Workflow.Application.Common.Exceptions;
using Workflow.Application.Hubs;
using Workflow.Core.Models;
using Workflow.Persistense.Context;

namespace Workflow.Application.Features.Boards.Commands.Create;

public sealed class CreateBoardCommandHandler(
    WorkflowDbContext context,
    IHubContext<NotifyHub> hubContext,
    IMapper mapper) : IRequestHandler<CreateBoardCommand, int>
{
    public async Task<int> Handle(CreateBoardCommand request, CancellationToken cancellationToken)
    {
        var project = await context.Projects
            .AsNoTrackingWithIdentityResolution()
            .FirstOrDefaultAsync(p => p.ProjectId == request.ProjectId,
                cancellationToken);

        if (project is null)
            throw new NotFoundException(nameof(Project), request.ProjectId);

        var newBoard = mapper.Map<Board>(request);

        await context.Boards.AddAsync(newBoard, cancellationToken);

        await context.SaveChangesAsync(cancellationToken);

        await hubContext.Clients.Group($"Agency_{project.AgencyId}")
            .SendAsync("BoardNotify", project.AgencyId,
                cancellationToken);

        return newBoard.BoardId;
    }
}