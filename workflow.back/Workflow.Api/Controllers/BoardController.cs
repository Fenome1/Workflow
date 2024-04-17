using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Workflow.Api.Controllers.Base;
using Workflow.Application.Features.Boards.Commands.Create;
using Workflow.Application.Features.Boards.Commands.Delete;
using Workflow.Application.Features.Boards.Commands.Update;
using Workflow.Application.Features.Boards.Queries.ByProject;

namespace Workflow.Api.Controllers;

public class BoardController : BaseController
{
    [Authorize]
    [HttpGet("Project/{projectId}")]
    public async Task<ActionResult<int>> GetByAgencyId(int projectId)
    {
        try
        {
            return Ok(await Mediator.Send(new ListBoardsByProjectQuery(projectId)));
        }
        catch (Exception e)
        {
            return BadRequest($"{e.Message}");
        }
    }

    [Authorize]
    [HttpPost("Create")]
    public async Task<ActionResult<int>> Create([FromBody] CreateBoardCommand command)
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
    public async Task<ActionResult<int>> Update([FromBody] UpdateBoardCommand command)
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
    [HttpDelete("Delete/{boardId}")]
    public async Task<ActionResult<int>> Delete(int boardId)
    {
        try
        {
            return Ok(await Mediator.Send(new DeleteBoardCommand(boardId)));
        }
        catch (Exception e)
        {
            return BadRequest($"{e.Message}");
        }
    }
}