using Microsoft.AspNetCore.Mvc;
using Workflow.Api.Controllers.Base;
using Workflow.Application.Features.Agencies.Commands.Update;
using Workflow.Application.Features.Agencies.Queries.ByUser;
using Workflow.Application.Features.Users.Commands.Create;

namespace Workflow.Api.Controllers;

public class AgencyController : BaseController
{
    [HttpPut("Update", Name = "Update")]
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
    [HttpGet("{userId}")]
    public async Task<ActionResult<int>> GetByUserId(int userId)
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
}