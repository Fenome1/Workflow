using MediatR;

namespace Workflow.Application.Features.Boards.Commands.Delete;

public record DeleteBoardCommand(int BoardId) : IRequest<Unit>;