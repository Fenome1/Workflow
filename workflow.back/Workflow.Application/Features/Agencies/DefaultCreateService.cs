using MediatR;
using Workflow.Application.Features.Projects.Commands.Create;
using Workflow.Core.Models;

namespace Workflow.Application.Features.Agencies;

public static class DefaultCreateService
{
    public static async Task CreateDefaultProject(
        this IMediator mediator,
        CancellationToken cancellationToken,
        Agency newAgency)
    {
        await mediator.Send(new CreateProjectCommand
        {
            AgencyId = newAgency.AgencyId,
            Name = "Проект 1"
        }, cancellationToken);
    }
}