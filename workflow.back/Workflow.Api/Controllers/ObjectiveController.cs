using MediatR;
using Microsoft.AspNetCore.Mvc;
using Workflow.Api.Controllers.Base;
using Workflow.Application.Features.Objectives.Commands.Create;
using Workflow.Application.Features.Objectives.Commands.Delete;
using Workflow.Application.Features.Objectives.Commands.Update;
using Workflow.Application.Features.Objectives.Queries.ByColumn;
using Workflow.Application.ViewModels;

namespace Workflow.Api.Controllers;

public class ObjectiveController : BaseController
{
    /*[Authorize]*/
    [HttpGet("Column/{columnId}")]
    public async Task<ActionResult<List<ObjectiveViewModel>>> GetByBoard(int columnId)
    {
        try
        {
            return Ok(await Mediator.Send(new ListObjectivesByColumnQuery(columnId)));
        }
        catch (Exception e)
        {
            return BadRequest($"{e.Message}");
        }
    }

    /*[Authorize]*/
    [HttpPost("Create")]
    public async Task<ActionResult<int>> Create([FromBody] CreateObjectiveCommand command)
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

    /*[Authorize]*/
    [HttpPut("Update")]
    public async Task<ActionResult<int>> Update([FromBody] UpdateObjectiveCommand command)
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

    /*[Authorize]*/
    [HttpDelete("Delete/{objectiveId}")]
    public async Task<ActionResult<Unit>> Delete(int objectiveId)
    {
        try
        {
            return Ok(await Mediator.Send(new DeleteObjectiveCommand(objectiveId)));
        }
        catch (Exception e)
        {
            return BadRequest($"{e.Message}");
        }
    }
}