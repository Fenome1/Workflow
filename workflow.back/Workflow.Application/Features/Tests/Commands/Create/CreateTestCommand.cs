using MediatR;
using Workflow.Application.Common.Mappings;
using Workflow.Core.Models;

namespace Workflow.Application.Features.Tests.Commands.Create;

public class CreateTestCommand : IRequest<int>, IMapWith<Test>
{
    public string Title { get; set; }
}