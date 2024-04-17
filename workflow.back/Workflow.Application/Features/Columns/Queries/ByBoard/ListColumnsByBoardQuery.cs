using MediatR;
using Workflow.Application.ViewModels;

namespace Workflow.Application.Features.Columns.Queries.ByBoard;

public record ListColumnsByBoardQuery(int BoardId) : IRequest<List<ColumnViewModel>>;