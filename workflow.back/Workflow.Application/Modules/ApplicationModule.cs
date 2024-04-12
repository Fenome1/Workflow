using Autofac;
using AutoMapper.Contrib.Autofac.DependencyInjection;
using MediatR.Extensions.Autofac.DependencyInjection;
using MediatR.Extensions.Autofac.DependencyInjection.Builder;
using Workflow.Application.Common.Interfaces;
using Workflow.Application.Common.Mappings;
using Workflow.Application.Services;

namespace Workflow.Application.Modules;

public sealed class ApplicationModule : Module
{
    protected override void Load(ContainerBuilder builder)
    {
        builder.RegisterAutoMapper(config => { config.AddProfile(new AssemblyMappingProfile(ThisAssembly)); });

        builder.RegisterType<PasswordHasher>()
            .As<IPasswordHasher>()
            .AsSelf();
        
        builder.RegisterMediatR(MediatRConfigurationBuilder
            .Create(ThisAssembly)
            .WithAllOpenGenericHandlerTypesRegistered()
            .WithRegistrationScope(RegistrationScope.Scoped)
            .Build());
    }
}