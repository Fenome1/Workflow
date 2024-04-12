using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Workflow.Api.Controllers.Base;
using Workflow.Application.Features.Users.Commands.Create;

namespace Workflow.Api.Controllers;

public class UserController : BaseController
{
    [HttpPost("Register")]
    [AllowAnonymous]
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
}