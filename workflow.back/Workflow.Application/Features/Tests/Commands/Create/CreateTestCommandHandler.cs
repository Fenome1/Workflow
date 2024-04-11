using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.SignalR;
using Workflow.Application.Hubs;
using Workflow.Core.Models;
using Workflow.Persistense.Context;

namespace Workflow.Application.Features.Tests.Commands.Create;

public class CreateTestCommandHandler(WorkflowDbContext context, IMapper mapper, IHubContext<TestHub> testHub)
    : IRequestHandler<CreateTestCommand, int>
{
    public async Task<int> Handle(CreateTestCommand request, CancellationToken cancellationToken)
    {
        var newTest = mapper.Map<Test>(request);
        await context.Tests.AddAsync(newTest, cancellationToken);
        await context.SaveChangesAsync(cancellationToken);

        await testHub.Clients.All.SendAsync("TestCreated", newTest,
            cancellationToken);

        return newTest.TestId;
    }
}