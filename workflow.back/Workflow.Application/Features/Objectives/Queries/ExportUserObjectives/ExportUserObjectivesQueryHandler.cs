using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Workflow.Application.Common.Exceptions;
using Workflow.Application.Common.Interfaces;
using Workflow.Application.ViewModels;
using Workflow.Core.Models;
using Workflow.Persistense.Context;

namespace Workflow.Application.Features.Objectives.Queries.ExportUserObjectives;

public class ExportUserObjectivesQueryHandler(
    WorkflowDbContext context,
    IMapper mapper,
    IExcelExporter excelExporter) : IRequestHandler<ExportUserObjectivesQuery, IResult>
{
    public async Task<IResult> Handle(ExportUserObjectivesQuery request,
        CancellationToken cancellationToken)
    {
        var user = await context.Users
            .AsNoTrackingWithIdentityResolution()
            .FirstOrDefaultAsync(u => u.UserId == request.UserId,
                cancellationToken);

        if (user is null)
            throw new NotFoundException(nameof(User), request.UserId);

        var userObjectives = await context.Objectives
            .AsNoTrackingWithIdentityResolution()
            .Where(o => o.Users.Any(u => u.UserId == request.UserId))
            .Include(o => o.Column.Board.Project.Agency)
            .Include(o => o.Users)
            .Include(o => o.Priority)
            .ToListAsync(cancellationToken);

        var objectivesWithAgencies = userObjectives
            .GroupBy(o => o.Column.Board.Project.Agency)
            .Select(group => new UserAgenciesObjectivesViewModel
            {
                AgencyName = group.Key.Name,
                Objectives = group.Select(o => mapper.Map<ObjectiveViewModel>(o)).ToList()
            })
            .ToList();

        if (objectivesWithAgencies is null || !objectivesWithAgencies.Any())
            throw new Exception("Задач для экспорта не найдено");

        return await excelExporter.ExportUserObjectivesToExcel(user, objectivesWithAgencies);
    }
}