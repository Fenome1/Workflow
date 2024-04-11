using MediatR;
using Microsoft.EntityFrameworkCore;
using Workflow.Core.Models;
using Workflow.Persistense.Context;

namespace Workflow.Application.Features.Tests.Queries.List;

public class ListTestCommandHandler(WorkflowDbContext context) : IRequestHandler<ListTestCommand, List<Test>>
{
    public async Task<List<Test>> Handle(ListTestCommand request, CancellationToken cancellationToken)
    {
        var tests = await context.Tests
            .AsNoTrackingWithIdentityResolution()
            .ToListAsync(cancellationToken);

        if (tests is null)
            throw new Exception("Not found");

        return tests;
    }
}