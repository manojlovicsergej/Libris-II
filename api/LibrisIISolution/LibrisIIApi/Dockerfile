FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
COPY ["LibrisIIApi/LibrisIIApi.csproj", "LibrisIIApi/"]
RUN dotnet restore "LibrisIIApi/LibrisIIApi.csproj"
COPY . .
WORKDIR "/src/LibrisIIApi"
RUN dotnet build "LibrisIIApi.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "LibrisIIApi.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "LibrisIIApi.dll"]
