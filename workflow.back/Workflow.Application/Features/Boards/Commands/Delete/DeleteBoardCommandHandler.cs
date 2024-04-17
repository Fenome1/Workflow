using MediatR;
using Workflow.Application.Common.Exceptions;
using Workflow.Persistense.Context;

namespace Workflow.Application.Features.Boards.Commands.Delete;

public sealed class DeleteBoardCommandHandler(WorkflowDbContext context) : IRequestHandler<DeleteBoardCommand, Unit>
{
    public async Task<Unit> Handle(DeleteBoardCommand request, CancellationToken cancellationToken)
    {
        var deletingBoard = await context.Boards
            .FindAsync(request.BoardId);

        if (deletingBoard is null)
            throw new NotFoundException(nameof(deletingBoard));

        context.Boards.Remove(deletingBoard);
        await context.SaveChangesAsync(cancellationToken);

        return Unit.Value;
    }
}