﻿using AutoMapper;
using MediatR;
using Workflow.Application.Common.Interfaces;
using Workflow.Application.Features.Agencies.Commands.Create;
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
        var isLoginExist = context.Users
            .Any(u => u.Email == request.Email);

        if (isLoginExist)
            throw new Exception("Пользователь с таким логином уже существует");

        var user = mapper.Map<User>(request);
        user.Password = passwordHasher.Hash(request.Password);

        await context.Users.AddAsync(user, cancellationToken);
        await context.SaveChangesAsync(cancellationToken);

        await mediator.Send(new CreateAgencyCommand(user.UserId), 
            cancellationToken);

        return user.UserId;
    }
}