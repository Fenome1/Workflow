namespace Workflow.Application.Common.Interfaces;

public interface ILinkService
{
    string GenerateToken();
    string GetLinkByToken(string token);
}