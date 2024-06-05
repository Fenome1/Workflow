using MediatR;
using Microsoft.AspNetCore.Http;
using Workflow.Application.ViewModels;

namespace Workflow.Application.Features.Objectives.Queries.ExportUserObjectives;

public record ExportUserObjectivesQuery(int UserId) : IRequest<IResult>;
