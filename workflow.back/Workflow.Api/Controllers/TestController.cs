using Microsoft.AspNetCore.Mvc;
using Workflow.Api.Controllers.Base;
using Workflow.Application.Features.Tests.Commands.Create;
using Workflow.Application.Features.Tests.Commands.Delete;
using Workflow.Application.Features.Tests.Queries.List;
using Workflow.Core.Models;

namespace Workflow.Api.Controllers;

public class TestController : BaseController
{
    [HttpPost]
    [Route("Create/")]
    public async Task<ActionResult<int>> Create([FromBody] CreateTestCommand command)
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

    [HttpGet]
    public async Task<ActionResult<List<Test>>> Get([FromHeader] ListTestCommand query)
    {
        try
        {
            return Ok(await Mediator.Send(query));
        }
        catch (Exception e)
        {
            return BadRequest($"{e.Message}");
        }
    }

    [HttpDelete("Delete/{testId:int}")]
    public async Task<ActionResult<bool>> Delete(int testId)
    {
        try
        {
            return Ok(await Mediator.Send(new DeleteTestCommand { TestId = testId }));
        }
        catch (Exception e)
        {
            return BadRequest($"{e.Message}");
        }
    }
}