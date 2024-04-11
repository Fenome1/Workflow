using MediatR;
using Microsoft.AspNetCore.SignalR;
using Workflow.Application.Hubs;
using Workflow.Persistense.Context;

namespace Workflow.Application.Features.Tests.Commands.Delete;

public class DeleteTestCommandHandler(WorkflowDbContext context, IHubContext<TestHub> hubContext)
    : IRequestHandler<DeleteTestCommand, bool>
{
    public async Task<bool> Handle(DeleteTestCommand request, CancellationToken cancellationToken)
    {
        var test = await context.Tests.FindAsync(request.TestId);

        if (test is null)
            throw new Exception("Not found");

        context.Tests.Remove(test);

        await hubContext.Clients.All.SendAsync("DeleteTest", test.TestId,
            cancellationToken);

        return await context.SaveChangesAsync(cancellationToken) > 1;
    }
}