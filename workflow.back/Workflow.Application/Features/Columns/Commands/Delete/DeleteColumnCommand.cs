using MediatR;

namespace Workflow.Application.Features.Columns.Commands.Delete;

public record DeleteColumnCommand(int ColumnId) : IRequest<Unit>;