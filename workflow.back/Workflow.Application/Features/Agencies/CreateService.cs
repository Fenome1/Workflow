using MediatR;
using Workflow.Application.Features.Agencies.Commands.Create;
using Workflow.Application.Features.Projects.Commands.Create;
using Workflow.Core.Models;

namespace Workflow.Application.Features.Agencies;

public static class CreateService
{
    public static async Task CreateProjectAsync(this IMediator mediator,
        Agency agency,
        CancellationToken cancellationToken,
        string name = "Проект 1")
    {
        await mediator.Send(new CreateProjectCommand
        {
            AgencyId = agency.AgencyId,
            Name = name
        }, cancellationToken);
    }

    public static async Task CreateAgencyAsync(
        this IMediator mediator,
        int ownerId,
        CancellationToken cancellationToken,
        string name = "Моё агентство",
        string description = "")
    {
        await mediator.Send(new CreateAgencyCommand
        {
            UserId = ownerId,
            Name = name,
            Description = description
        }, cancellationToken);
    }
}