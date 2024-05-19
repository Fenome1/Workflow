using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Workflow.Api.Controllers.Base;
using Workflow.Application.Features.Agencies.Commands.Create;
using Workflow.Application.Features.Agencies.Commands.Delete;
using Workflow.Application.Features.Agencies.Commands.FireUser;
using Workflow.Application.Features.Agencies.Commands.Join;
using Workflow.Application.Features.Agencies.Commands.Update;
using Workflow.Application.Features.Agencies.Queries.ByToken;
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
    [HttpGet("Token/{token}")]
    public async Task<ActionResult<List<AgencyViewModel>>> GetByToken(string token)
    {
        try
        {
            return Ok(await Mediator.Send(new GetAgencyByTokenQuery(token)));
        }
        catch (Exception e)
        {
            return BadRequest($"{e.Message}");
        }
    }

    [Authorize]
    [HttpPost("Create")]
    public async Task<ActionResult<int>> Create([FromBody] CreateAgencyCommand command)
    {
        try
        {
            return Created("", await Mediator.Send(command));
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

    [Authorize]
    [HttpDelete("Delete/{agencyId}")]
    public async Task<ActionResult<Unit>> Delete(int agencyId)
    {
        try
        {
            return Ok(await Mediator.Send(new DeleteAgencyCommand(agencyId)));
        }
        catch (Exception e)
        {
            return BadRequest($"{e.Message}");
        }
    }

    [HttpPut("Join")]
    public async Task<ActionResult<Unit>> Join([FromBody] JoinToAgencyCommand command)
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

    [HttpDelete("Fire")]
    public async Task<ActionResult<Unit>> Fire([FromBody] FireUserFromAgencyCommand command)
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