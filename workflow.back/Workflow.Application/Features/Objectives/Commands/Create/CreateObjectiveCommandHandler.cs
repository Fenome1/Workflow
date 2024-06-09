using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Workflow.Application.Common.Exceptions;
using Workflow.Application.Hubs;
using Workflow.Core.Models;
using Workflow.Persistense.Configurations;
using Workflow.Persistense.Context;

namespace Workflow.Application.Features.Objectives.Commands.Create;

public sealed class CreateObjectiveCommandHandler(
    WorkflowDbContext context,
    IHubContext<NotifyHub> hubContext,
    IMapper mapper) : IRequestHandler<CreateObjectiveCommand, int>
{
    public async Task<int> Handle(CreateObjectiveCommand request, CancellationToken cancellationToken)
    {
        var ownerColumn = await context.Columns
            .Include(c => c.Board.Project)
            .Include(c => c.Objectives)
            .FirstOrDefaultAsync(b => b.ColumnId == request.ColumnId,
                cancellationToken);

        if (ownerColumn is null)
            throw new NotFoundException(nameof(Column), request.ColumnId);

        return await context.WithTransactionAsync(async () =>
        {
            var newObjective = mapper.Map<Objective>(request);
            newObjective.Order = 0;

            foreach (var objective in ownerColumn.Objectives)
                objective.Order += 1;

            await context.Objectives.AddAsync(newObjective, cancellationToken);

            await context.SaveChangesAsync(cancellationToken);

            await hubContext.Clients.Group($"Agency_{ownerColumn.Board.Project.AgencyId}")
                .SendAsync("ObjectiveNotify", ownerColumn.Board.Project.AgencyId,
                    cancellationToken);

            return newObjective.ObjectiveId;
        }, cancellationToken);
    }
}