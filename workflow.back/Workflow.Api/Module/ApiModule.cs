using Autofac;
using Autofac.Extensions.DependencyInjection;
using Workflow.Persistense.Context;

namespace Workflow.Api.Module;

public class ApiModule(IConfiguration configuration) : Autofac.Module
{
    protected override void Load(ContainerBuilder builder)
    {
        var services = new ServiceCollection();

        services.AddDbContext<WorkflowDbContext>();

        services.AddSignalR();

        builder.Populate(services);
    }
}