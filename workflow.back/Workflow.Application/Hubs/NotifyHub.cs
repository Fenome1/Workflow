using Microsoft.AspNetCore.SignalR;
using Workflow.Application.Common.Enums.Static;

namespace Workflow.Application.Hubs;

public class NotifyHub : Hub
{
    private static readonly Dictionary<string, int> UserAgencyGroups = new();

    public override async Task OnConnectedAsync()
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, "Events");
        await base.OnConnectedAsync();
    }

    public override async Task OnDisconnectedAsync(Exception? exception)
    {
        var connectionId = Context.ConnectionId;

        if (UserAgencyGroups.TryGetValue(connectionId, out var currentAgencyId))
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, SignalGroups.AgencyGroupWithId(currentAgencyId));
            UserAgencyGroups.Remove(connectionId);
        }

        await Groups.RemoveFromGroupAsync(Context.ConnectionId, "Events");
        await base.OnDisconnectedAsync(exception);
    }

    public async Task JoinAgencyAsync(int agencyId)
    {
        var userId = Context.ConnectionId;

        if (UserAgencyGroups.TryGetValue(userId, out var currentAgencyId))
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, $"Agency_{currentAgencyId}");

        await Groups.AddToGroupAsync(Context.ConnectionId, $"Agency_{agencyId}");

        UserAgencyGroups[userId] = agencyId;
    }
}