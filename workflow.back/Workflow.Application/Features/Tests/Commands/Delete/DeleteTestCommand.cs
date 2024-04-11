using MediatR;

namespace Workflow.Application.Features.Tests.Commands.Delete;

public class DeleteTestCommand : IRequest<bool>
{
    public int TestId { get; set; }
}