using MediatR;
using Workflow.Application.Common.Exceptions;
using Workflow.Persistense.Context;

namespace Workflow.Application.Features.Boards.Commands.Update;

public sealed class UpdateBoardCommandHandler(WorkflowDbContext context) : IRequestHandler<UpdateBoardCommand, int>
{
    public async Task<int> Handle(UpdateBoardCommand request, CancellationToken cancellationToken)
    {
        var editingBoard = await context.Boards
            .FindAsync(request.BoardId);

        if (editingBoard is null)
            throw new NotFoundException(nameof(editingBoard));

        if (!string.IsNullOrWhiteSpace(request.Name))
            editingBoard.Name = request.Name;

        await context.SaveChangesAsync(cancellationToken);

        return editingBoard.BoardId;
    }
}