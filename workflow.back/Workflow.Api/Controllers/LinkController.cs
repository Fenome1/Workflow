using Microsoft.AspNetCore.Mvc;
using Workflow.Api.Controllers.Base;
using Workflow.Application.Features.Links.Command.Refresh;
using Workflow.Application.Features.Links.Queries.ByAgency;
using Workflow.Application.ViewModels;

namespace Workflow.Api.Controllers;

public class LinkController : BaseController
{
    [HttpPost("Refresh/Agency/{agencyId}")]
    public async Task<ActionResult<int>> Refresh(int agencyId)
    {
        try
        {
            return Created("", await Mediator.Send(new RefreshAgencyLinkCommand(agencyId)));
        }
        catch (Exception e)
        {
            return BadRequest($"{e.Message}");
        }
    }

    [HttpGet("Agency/{agencyId}")]
    public async Task<ActionResult<LinkViewModel?>> GetByAgency(int agencyId)
    {
        try
        {
            return Ok(await Mediator.Send(new GetLinkByAgencyQuery(agencyId)));
        }
        catch (Exception e)
        {
            return BadRequest($"{e.Message}");
        }
    }
}