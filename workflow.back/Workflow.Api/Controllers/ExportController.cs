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
    public async Task<IActionResult> GetUserAgenciesWithObjectives(int userId)
    {
        try
        {
            return Ok(await Mediator.Send(new ExportUserObjectivesQuery(userId)));
        }
        catch (Exception e)
        {
            return BadRequest($"{e.Message}");
        }
    }
}