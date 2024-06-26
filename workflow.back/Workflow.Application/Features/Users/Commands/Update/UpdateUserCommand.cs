﻿using MediatR;
using Workflow.Application.Common.Mappings;
using Workflow.Application.ViewModels;
using Workflow.Core.Models;

namespace Workflow.Application.Features.Users.Commands.Update;

public record UpdateUserCommand : IRequest<UserViewModel>, IMapWith<User>
{
    public required int UserId { get; set; }
    public string? Email { get; set; }
    public string? Name { get; set; }
    public byte[]? AvatarImage { get; set; }
    public bool? IsAvatarImageReset { get; set; } = false;
}