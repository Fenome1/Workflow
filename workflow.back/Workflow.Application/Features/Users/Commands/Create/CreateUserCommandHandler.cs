using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Workflow.Application.Common.Interfaces;
using Workflow.Application.Features.Agencies;
using Workflow.Core.Models;
using Workflow.Persistense.Context;

namespace Workflow.Application.Features.Users.Commands.Create;

public sealed class CreateUserCommandHandler(
    WorkflowDbContext context,
    IMapper mapper,
    IPasswordHasher passwordHasher,
    IMediator mediator) : IRequestHandler<CreateUserCommand, int>
{
    public async Task<int> Handle(CreateUserCommand request, CancellationToken cancellationToken)
    {
        var isLoginExist = await context.Users
            .AnyAsync(u => u.Email == request.Email,
                cancellationToken);

        if (isLoginExist)
            throw new Exception("Пользователь с таким логином уже существует");

        var user = mapper.Map<User>(request);

        var userName = user.Email.Split('@').First();
        user.Name = userName;

        user.Password = passwordHasher.Hash(request.Password);

        await context.Users.AddAsync(user, cancellationToken);
        await context.SaveChangesAsync(cancellationToken);

        await mediator.CreateAgencyAsync(user.UserId, cancellationToken);

        return user.UserId;
    }
}