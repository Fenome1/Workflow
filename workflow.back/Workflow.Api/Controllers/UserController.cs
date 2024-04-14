using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Workflow.Api.Controllers.Base;
using Workflow.Application.Common.Exceptions;
using Workflow.Application.Features.Users.Commands.Create;
using Workflow.Application.Features.Users.Commands.Login;
using Workflow.Application.Features.Users.Commands.Logout;
using Workflow.Application.Features.Users.Commands.Refresh;
using Workflow.Application.Features.Users.Commands.Update;
using Workflow.Application.ViewModels;

namespace Workflow.Api.Controllers;

public class UserController : BaseController
{
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
    
    [AllowAnonymous]
    [HttpPost("Login")]
    public async Task<ActionResult<UserViewModel>> Login([FromBody] LoginUserCommand command)
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

    [AllowAnonymous]
    [HttpPost("Refresh")]
    public async Task<ActionResult<AuthResultViewModel>> Refresh(RefreshCommand command)
    {
        try
        {
            return await Mediator.Send(command);
        }
        catch (NotFoundException e)
        {
            return StatusCode(StatusCodes.Status404NotFound, e.Message);
        }
    }

    [HttpPut("Logout")]
    public async Task<IActionResult> Logout(LogoutCommand command)
    {
        try
        {
            return Ok(await Mediator.Send(command));
        }
        catch
        {
            return BadRequest("Ошибка при выходе из аккаунта");
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