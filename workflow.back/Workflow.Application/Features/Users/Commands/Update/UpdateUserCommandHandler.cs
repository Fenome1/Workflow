﻿using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Workflow.Application.Common.Exceptions;
using Workflow.Application.ViewModels;
using Workflow.Persistense.Context;

namespace Workflow.Application.Features.Users.Commands.Update;

public sealed class UpdateUserCommandHandler(IMapper mapper, WorkflowDbContext context)
    : IRequestHandler<UpdateUserCommand, UserViewModel>
{
    public async Task<UserViewModel> Handle(UpdateUserCommand request, CancellationToken cancellationToken)
    {
        var user = await context.Users
            .FirstOrDefaultAsync(u => u.UserId == request.UserId,
                cancellationToken);

        if (user is null)
            throw new NotFoundException(nameof(user));

        if (!string.IsNullOrWhiteSpace(request.Email))
        {
            var existedUser = await context.Users
                .FirstOrDefaultAsync(u => u.Email == request.Email,
                    cancellationToken);

            if (existedUser is not null && existedUser.UserId != request.UserId)
                throw new Exception("Почта уже занята");

            user.Email = request.Email;
        }

        if (!string.IsNullOrWhiteSpace(request.Name))
            user.Name = request.Name;

        if (request.IsAvatarImageReset!.Value)
            user.AvatarImage = null;
        else if (request.AvatarImage is not null)
            user.AvatarImage = request.AvatarImage;

        context.Users.Update(user);
        await context.SaveChangesAsync(cancellationToken);

        return mapper.Map<UserViewModel>(user);
    }
}