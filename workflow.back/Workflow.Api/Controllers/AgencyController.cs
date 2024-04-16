using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Workflow.Api.Controllers.Base;
using Workflow.Application.Features.Agencies.Commands.Update;
using Workflow.Application.Features.Agencies.Queries.ByUser;
using Workflow.Application.ViewModels;

namespace Workflow.Api.Controllers;

public class AgencyController : BaseController
{
    [Authorize]
    [HttpGet("User/{userId}")]
    public async Task<ActionResult<List<AgencyViewModel>>> GetByUserId(int userId)
    {
        try
        {
            return Ok(await Mediator.Send(new ListAgenciesByUserQuery(userId)));
        }
        catch (Exception e)
        {
            return BadRequest($"{e.Message}");
        }
    }

    [Authorize]
    [HttpPut("Update")]
    public async Task<ActionResult<int>> Update([FromBody] UpdateAgencyCommand command)
    {
        try
        {
            return Ok(await Mediator.Send(command));
        }
        catch (Exception e)
        {
            return BadRequest($"{e.Message}");
        }
    }
}