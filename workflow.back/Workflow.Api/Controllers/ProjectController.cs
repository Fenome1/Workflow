using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Workflow.Api.Controllers.Base;
using Workflow.Application.Features.Projects.Commands.Create;
using Workflow.Application.Features.Projects.Commands.Delete;
using Workflow.Application.Features.Projects.Commands.Update;
using Workflow.Application.Features.Projects.Queries.ByAgency;

namespace Workflow.Api.Controllers;

public class ProjectController : BaseController
{
    [Authorize]
    [HttpGet("{agencyId}")]
    public async Task<ActionResult<int>> GetByAgencyId(int agencyId)
    {
        try
        {
            return Ok(await Mediator.Send(new ListProjectsByAgencyQuery(agencyId)));
        }
        catch (Exception e)
        {
            return BadRequest($"{e.Message}");
        }
    }
    
    [Authorize]
    [HttpPost("Create")]
    public async Task<ActionResult<int>> Create([FromBody] CreateProjectCommand command)
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
    public async Task<ActionResult<int>> Update([FromBody] UpdateProjectCommand command)
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
    [HttpDelete("Delete/{projectId}")]
    public async Task<ActionResult<int>> Delete(int projectId)
    {
        try
        {
            return Ok(await Mediator.Send(new DeleteProjectCommand(projectId)));
        }
        catch (Exception e)
        {
            return BadRequest($"{e.Message}");
        }
    }
}