using MediatR;
using Workflow.Core.Models;

namespace Workflow.Application.Features.Tests.Queries.List;

public class ListTestCommand : IRequest<List<Test>>
{
}