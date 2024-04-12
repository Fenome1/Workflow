using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Workflow.Application.Common.Exceptions;
using Workflow.Persistense.Context;

namespace Workflow.Application.Features.Agencies.Commands.Update;

public class UpdateAgencyCommandHandler(WorkflowDbContext context, IMapper mapper) : IRequestHandler<UpdateAgencyCommand, int>
{
    public async Task<int> Handle(UpdateAgencyCommand request, CancellationToken cancellationToken)
    {
        var agency = await context.Agencies
            .FindAsync(request.AgencyId);

        if (agency is null)
            throw new NotFoundException(nameof(agency));

        if(!string.IsNullOrWhiteSpace(request.Name))
            agency.Name = request.Name;
        
        if(!string.IsNullOrWhiteSpace(request.Description))
            agency.Description = request.Description;
        
        await context.SaveChangesAsync(cancellationToken);

        return agency.AgencyId;
    }
}