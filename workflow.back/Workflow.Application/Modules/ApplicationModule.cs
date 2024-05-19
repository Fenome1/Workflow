using Autofac;
using AutoMapper.Contrib.Autofac.DependencyInjection;
using MediatR.Extensions.Autofac.DependencyInjection;
using MediatR.Extensions.Autofac.DependencyInjection.Builder;
using Workflow.Application.Common.Interfaces;
using Workflow.Application.Common.Mappings;
using Workflow.Application.Services;
using Workflow.Application.Services.TokenService;

namespace Workflow.Application.Modules;

public sealed class ApplicationModule : Module
{
    protected override void Load(ContainerBuilder builder)
    {
        builder.RegisterAutoMapper(config => { config.AddProfile(new AssemblyMappingProfile(ThisAssembly)); });

        builder.RegisterType<PasswordHasher>()
            .As<IPasswordHasher>()
            .AsSelf();

        builder.RegisterType<TokenService>()
            .As<ITokenService>()
            .AsSelf();

        builder.RegisterType<LinkService>()
            .As<ILinkService>()
            .AsSelf();

        builder.RegisterMediatR(MediatRConfigurationBuilder
            .Create(ThisAssembly)
            .WithAllOpenGenericHandlerTypesRegistered()
            .WithRegistrationScope(RegistrationScope.Scoped)
            .Build());
    }
}