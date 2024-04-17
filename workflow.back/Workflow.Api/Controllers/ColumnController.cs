using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Workflow.Api.Controllers.Base;
using Workflow.Application.Features.Columns.Commands.Create;
using Workflow.Application.Features.Columns.Commands.Delete;
using Workflow.Application.Features.Columns.Commands.Swap;
using Workflow.Application.Features.Columns.Commands.Update;
using Workflow.Application.Features.Columns.Queries.ByBoard;
using Workflow.Application.ViewModels;

namespace Workflow.Api.Controllers;

public class ColumnController : BaseController
{
    [Authorize]
    [HttpGet("Board/{boardId}")]
    public async Task<ActionResult<List<ColumnViewModel>>> GetByBoard(int boardId)
    {
        try
        {
            return Ok(await Mediator.Send(new ListColumnsByBoardQuery(boardId)));
        }
        catch (Exception e)
        {
            return BadRequest($"{e.Message}");
        }
    }

    /*[Authorize]*/
    [HttpPost("Create")]
    public async Task<ActionResult<int>> Create([FromBody] CreateColumnCommand command)
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
    public async Task<ActionResult<int>> Update([FromBody] UpdateColumnCommand command)
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
    [HttpPut("Swap")]
    public async Task<ActionResult<Unit>> Delete([FromBody] SwapColumnOrderCommand command)
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
    [HttpDelete("Delete/{columnId}")]
    public async Task<ActionResult<Unit>> Delete(int columnId)
    {
        try
        {
            return Ok(await Mediator.Send(new DeleteColumnCommand(columnId)));
        }
        catch (Exception e)
        {
            return BadRequest($"{e.Message}");
        }
    }
}