using MediatR;
using Microsoft.AspNetCore.Http;

namespace Workflow.Application.Features.Objectives.Queries.ExportUserObjectives;

public record ExportUserObjectivesQuery(int UserId) : IRequest<IResult>;