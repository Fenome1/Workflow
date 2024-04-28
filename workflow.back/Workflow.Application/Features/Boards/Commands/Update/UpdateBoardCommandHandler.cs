using MediatR;
using Workflow.Application.Common.Exceptions;
using Workflow.Core.Models;
using Workflow.Persistense.Context;

namespace Workflow.Application.Features.Boards.Commands.Update;

public sealed class UpdateBoardCommandHandler(WorkflowDbContext context) : IRequestHandler<UpdateBoardCommand, int>
{
    public async Task<int> Handle(UpdateBoardCommand request, CancellationToken cancellationToken)
    {
        var editingBoard = await context.Boards
            .FindAsync(request.BoardId);

        if (editingBoard is null)
            throw new NotFoundException(nameof(Board), request.BoardId);

        editingBoard.Name = request.Name;

        editingBoard.Description = request.Description;

        await context.SaveChangesAsync(cancellationToken);

        return editingBoard.BoardId;
    }
}