using Microsoft.AspNetCore.Mvc;
using Workflow.Api.Controllers.Base;
using Workflow.Application.Features.Priorities.Queries;
using Workflow.Application.ViewModels;

namespace Workflow.Api.Controllers;

public class PriorityController : BaseController
{
    /*[Authorize]*/
    [HttpGet]
    public async Task<ActionResult<List<ObjectiveViewModel>>> Get()
    {
        try
        {
            return Ok(await Mediator.Send(new ListPrioritiesQuery()));
        }
        catch (Exception e)
        {
            return BadRequest($"{e.Message}");
        }
    }
}