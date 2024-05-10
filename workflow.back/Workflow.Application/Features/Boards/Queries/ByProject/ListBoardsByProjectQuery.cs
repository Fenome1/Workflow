using MediatR;
using Workflow.Application.ViewModels;

namespace Workflow.Application.Features.Boards.Queries.ByProject;

public record ListBoardsByProjectQuery(int ProjectId) : IRequest<List<BoardViewModel>>;