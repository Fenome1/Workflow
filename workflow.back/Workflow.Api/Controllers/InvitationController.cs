using MediatR;
using Microsoft.AspNetCore.Mvc;
using Workflow.Api.Controllers.Base;
using Workflow.Application.Features.Invitations.Commands.Answer;
using Workflow.Application.Features.Invitations.Commands.Recall;
using Workflow.Application.Features.Invitations.Commands.Send;
using Workflow.Application.Features.Invitations.Queries.ByAgency;
using Workflow.Application.Features.Invitations.Queries.ByUser;
using Workflow.Application.ViewModels;

namespace Workflow.Api.Controllers;

public class InvitationController : BaseController
{
    [HttpGet("Agency/{agencyId}")]
    public async Task<ActionResult<List<InvitationViewModel>>> GetByAgency(int agencyId)
    {
        try
        {
            return Ok(await Mediator.Send(new ListAgencyInvitationsQuery(agencyId)));
        }
        catch (Exception e)
        {
            return BadRequest($"{e.Message}");
        }
    }

    [HttpGet("User/{userId}")]
    public async Task<ActionResult<List<InvitationViewModel>>> GetByUser(int userId)
    {
        try
        {
            return Ok(await Mediator.Send(new ListUserInvitationsQuery(userId)));
        }
        catch (Exception e)
        {
            return BadRequest($"{e.Message}");
        }
    }

    [HttpPost("Send")]
    public async Task<ActionResult<int>> Send([FromBody] SendInvitationCommand command)
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

    [HttpPut("Answer")]
    public async Task<ActionResult<Unit>> Answer([FromBody] AnswerOnInvitationCommand command)
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

    [HttpDelete("Recall/{invitationId}")]
    public async Task<ActionResult<Unit>> Recall(int invitationId)
    {
        try
        {
            return Ok(await Mediator.Send(new RecallInvitationCommand(invitationId)));
        }
        catch (Exception e)
        {
            return BadRequest($"{e.Message}");
        }
    }
}