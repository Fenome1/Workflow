using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Workflow.Api.Controllers.Base;
using Workflow.Application.Features.Agencies.Queries.ByUser;
using Workflow.Application.Features.Objectives.Queries.ExportUserObjectives;
using Workflow.Application.ViewModels;

namespace Workflow.Api.Controllers;

public class ExportController : BaseController
{
    /*[Authorize]*/
    [HttpGet("Objectives/User/{userId}")]
    public async Task<IResult> GetUserAgenciesWithObjectives(int userId)
    {
        return await Mediator.Send(new ExportUserObjectivesQuery(userId));
    }
}