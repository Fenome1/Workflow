﻿using Workflow.Application.Common.Mappings;
using Workflow.Core.Models;

namespace Workflow.Application.ViewModels;

public record AgencyViewModel : IMapWith<Agency>
{
    public required int AgencyId { get; set; }

    public required string Name { get; set; }

    public string? Description { get; set; }

    public required int OwnerId { get; set; }
}