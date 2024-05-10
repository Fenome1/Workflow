using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Workflow.Application.Common.Exceptions;
using Workflow.Core.Models;
using Workflow.Persistense.Context;

namespace Workflow.Application.Features.Boards.Commands.Create;

public sealed class CreateBoardCommandHandler(
    WorkflowDbContext context,
    IMapper mapper) : IRequestHandler<CreateBoardCommand, int>
{
    public async Task<int> Handle(CreateBoardCommand request, CancellationToken cancellationToken)
    {
        var isProjectExists = await context.Projects
            .AsNoTrackingWithIdentityResolution()
            .AnyAsync(p => p.ProjectId == request.ProjectId,
                cancellationToken);

        if (!isProjectExists)
            throw new NotFoundException(nameof(Project), request.ProjectId);

        var newBoard = mapper.Map<Board>(request);

        await context.Boards.AddAsync(newBoard, cancellationToken);

        await context.SaveChangesAsync(cancellationToken);

        return newBoard.BoardId;
    }
}