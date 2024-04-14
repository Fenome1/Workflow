namespace Workflow.Application.Common.Exceptions;

public class NotFoundException : Exception
{
    public NotFoundException() : base("Объект не найден")
    {
    }

    public NotFoundException(string objectName) : base($"Объект {objectName} не найден")
    {
    }

    public NotFoundException(string objectName, Exception innerException) : base($"Объект {objectName} не найден",
        innerException)
    {
    }
}