using AutoMapper;
using MediatR;
using Workflow.Application.Common.Mappings;
using Workflow.Core.Models;

namespace Workflow.Application.Features.Agencies.Commands.Create;

public record class CreateAgencyCommand(int UserId) : IRequest<int>;
