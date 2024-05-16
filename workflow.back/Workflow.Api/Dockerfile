FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER $APP_UID
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["Workflow.Api/Workflow.Api.csproj", "Workflow.Api/"]
COPY ["Workflow.Application/Workflow.Application.csproj", "Workflow.Application/"]
COPY ["Workflow.Core/Workflow.Core.csproj", "Workflow.Core/"]
COPY ["Workflow.Persistense/Workflow.Persistense.csproj", "Workflow.Persistense/"]
RUN dotnet restore "Workflow.Api/Workflow.Api.csproj"
COPY . .
WORKDIR "/src/Workflow.Api"
RUN dotnet build "Workflow.Api.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "Workflow.Api.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Workflow.Api.dll"]
