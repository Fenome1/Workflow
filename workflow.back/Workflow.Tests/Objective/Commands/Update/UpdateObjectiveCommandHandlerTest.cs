using Microsoft.EntityFrameworkCore;
using Workflow.Application.Features.Objectives.Commands.Update;
using Workflow.Persistense.Context;

namespace Workflow.Tests.Objective.Commands.Update;

public class UpdateObjectiveCommandHandlerTest
{
    [Fact]
    public async Task UpdateObjectiveCommandHandler_Success()
    {
        // Arrange
        var options = new DbContextOptionsBuilder<WorkflowDbContext>()
            .UseInMemoryDatabase(databaseName: "WorkflowTest").Options;
        
        await using var context = new WorkflowDbContext(options);

        var existingObjective = new Core.Models.Objective
        {
            ObjectiveId = 1,
            Status = false,
            CreationDate = DateTime.UtcNow,
            Name = "Задача 1",
            ColumnId = 1,
            Order = 1,
        };
        
        await context.Objectives.AddAsync(existingObjective);
        await context.SaveChangesAsync();
        
        var updateObjectiveCommand = new UpdateObjectiveCommand()
        {
            ObjectiveId = 1,
            Name = "Задача 2",
            Status = true,
            Deadline = DateOnly.MaxValue,
        };

        var commandHandler = new UpdateObjectiveCommandHandler(context);

        // Act
        await commandHandler.Handle(updateObjectiveCommand, CancellationToken.None);
        var result = await context.Objectives.FindAsync(existingObjective.ObjectiveId);

        // Assert
        Assert.NotNull(result);
        Assert.Equal(updateObjectiveCommand.Name, result.Name);
        Assert.Equal(updateObjectiveCommand.Status, result.Status);
        Assert.Equal(updateObjectiveCommand.Deadline, result.Deadline);
    }
}