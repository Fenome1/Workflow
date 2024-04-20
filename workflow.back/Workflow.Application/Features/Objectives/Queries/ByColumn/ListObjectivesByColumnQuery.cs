using MediatR;
using Workflow.Application.ViewModels;

namespace Workflow.Application.Features.Objectives.Queries.ByColumn;

public record ListObjectivesByColumnQuery(int ColumnId) : IRequest<List<ObjectiveViewModel>>;