using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Workflow.Api.Controllers.Base;
using Workflow.Application.Features.Users.Commands.Create;
using Workflow.Application.Features.Users.Commands.Update;
using Workflow.Application.Features.Users.Queries.ByAgency;
using Workflow.Application.ViewModels;

namespace Workflow.Api.Controllers;

public class UserController : BaseController
{
    [Authorize]
    [HttpGet("Agencies/{agencyId}")]
    public async Task<ActionResult<List<UserViewModel>>> GetByAgency(int agencyId)
    {
        try
        {
            return Ok(await Mediator.Send(new ListUsersByAgencyQuery(agencyId)));
        }
        catch (Exception e)
        {
            return BadRequest($"{e.Message}");
        }
    }

    [AllowAnonymous]
    [HttpPost("Register")]
    public async Task<ActionResult<int>> Register([FromBody] CreateUserCommand command)
    {
        try
        {
            return Created(string.Empty, await Mediator.Send(command));
        }
        catch (Exception e)
        {
            return BadRequest($"{e.Message}");
        }
    }

    [Authorize]
    [HttpPut("Update")]
    public async Task<ActionResult<UserViewModel>> Update([FromBody] UpdateUserCommand command)
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