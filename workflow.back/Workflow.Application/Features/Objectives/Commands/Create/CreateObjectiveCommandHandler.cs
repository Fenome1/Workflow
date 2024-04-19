using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Workflow.Application.Common.Exceptions;
using Workflow.Core.Models;
using Workflow.Persistense.Context;

namespace Workflow.Application.Features.Objectives.Commands.Create;

public sealed class CreateObjectiveCommandHandler(
    WorkflowDbContext context,
    IMapper mapper) : IRequestHandler<CreateObjectiveCommand, int>
{
    public async Task<int> Handle(CreateObjectiveCommand request, CancellationToken cancellationToken)
    {
        var ownerColumn = await context.Columns
            .AsNoTrackingWithIdentityResolution()
            .Include(c => c.Objectives)
            .FirstOrDefaultAsync(b => b.ColumnId == request.ColumnId,
                cancellationToken);

        if (ownerColumn is null)
            throw new NotFoundException(nameof(ownerColumn));

        var newObjective = mapper.Map<Objective>(request);

        var lastOrder = ownerColumn.Objectives.Count;
        newObjective.Order = lastOrder;

        await context.Objectives.AddAsync(newObjective, cancellationToken);

        await context.SaveChangesAsync(cancellationToken);

        return newObjective.ColumnId;
    }
}