namespace Workflow.Application.Common.Exceptions;

public class NotFoundException : Exception
{
    public NotFoundException() : base("Объект не найден")
    {
    }

    public NotFoundException(string objectName) : base($"Объект {objectName} не найден")
    {
    }

    public NotFoundException(string objectName, int objectId) : base($"Объект: {objectName}, Id:{objectId} не найден")
    {
    }
}