using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Workflow.Api.Controllers.Base;

[ApiController]
[Route("/Api/[controller]")]
public abstract class BaseController : ControllerBase
{
    protected IMediator Mediator => HttpContext.RequestServices.GetRequiredService<IMediator>();
}