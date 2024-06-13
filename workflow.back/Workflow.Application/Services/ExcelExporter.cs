using ClosedXML.Excel;
using Microsoft.AspNetCore.Http;
using Workflow.Application.Common.Interfaces;
using Workflow.Application.ViewModels;
using Workflow.Core.Models;

namespace Workflow.Application.Services;

public class ExcelExporter : IExcelExporter
{
    public async Task<IResult> ExportUserObjectivesToExcel(User currentUser,
        List<UserAgenciesObjectivesViewModel> userAgenciesObjectives)
    {
        using var workbook = new XLWorkbook();

        foreach (var userAgencyObjectives in userAgenciesObjectives)
        {
            var worksheet = workbook.Worksheets.Add(userAgencyObjectives.AgencyName);

            var currentRow = 1;

            var titleRow = worksheet.Row(currentRow);
            titleRow.Style.Font.Bold = true;

            worksheet.Cell(currentRow, 1).Value =
                $"Задачи пользователя \"{currentUser.Name}\" в агентстве \"{userAgencyObjectives.AgencyName}\"";
            worksheet.Range(currentRow, 1, currentRow, 5).Merge();

            currentRow++;

            worksheet.Range(currentRow, 1, currentRow, 5).Merge();

            currentRow++;

            var headerRange = worksheet.Range(currentRow, 1, currentRow, 5);
            headerRange.Style.Font.Bold = true;

            worksheet.Cell(currentRow, 1).Value = "Статус";
            worksheet.Cell(currentRow, 2).Value = "Название";
            worksheet.Cell(currentRow, 3).Value = "Дата создания";
            worksheet.Cell(currentRow, 4).Value = "Дедлайн";
            worksheet.Cell(currentRow, 5).Value = "Приоритет";

            currentRow++;

            foreach (var objective in userAgencyObjectives.Objectives)
            {
                worksheet.Cell(currentRow, 1).Value = objective.Status ? "+" : "-";
                worksheet.Cell(currentRow, 1).Style.Fill.BackgroundColor =
                    objective.Status ? XLColor.LightGreen : XLColor.AmericanRose;

                worksheet.Cell(currentRow, 2).Value = objective.Name;
                worksheet.Cell(currentRow, 3).Value = objective.CreationDate.ToString("dd.MM.yyyy");
                worksheet.Cell(currentRow, 4).Value = objective.Deadline?.ToString("dd.MM.yyyy") ?? "Н/Д";
                worksheet.Cell(currentRow, 5).Value = objective.Priority?.Name ?? "Н/Д";

                currentRow++;
            }

            var total = userAgencyObjectives.Objectives.Count;
            var completed = userAgencyObjectives.Objectives.Count(o => o.Status);
            var notCompleted = total - completed;
            var completionRate = (double)completed / total * 100;

            currentRow++;

            var resultRange = worksheet.Range(currentRow, 1, currentRow + 4, 2);
            resultRange.Columns().Style.Font.Bold = true;

            worksheet.Cell(currentRow, 1).Value = "Итог";
            worksheet.Range(currentRow, 1, currentRow, 2).Merge();

            currentRow++;

            worksheet.Cell(currentRow, 1).Value = "Всего";
            worksheet.Cell(currentRow, 2).Value = total;

            currentRow++;

            worksheet.Cell(currentRow, 1).Value = "Выполнено";
            worksheet.Cell(currentRow, 2).Value = completed;

            currentRow++;

            worksheet.Cell(currentRow, 1).Value = "Не выполнено";
            worksheet.Cell(currentRow, 2).Value = notCompleted;

            currentRow++;

            worksheet.Cell(currentRow, 1).Value = "Готово";
            worksheet.Cell(currentRow, 2).Value = $"{completionRate:0.00}%";

            worksheet.Columns().AdjustToContents();
        }

        await using var memoryStream = new MemoryStream();
        workbook.SaveAs(memoryStream);
        memoryStream.Seek(0, SeekOrigin.Begin);

        var fileContent = memoryStream.ToArray();
        var contentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
        var fileName = $"Задачи пользователя {currentUser.Name}.xlsx";

        return Results.File(fileContent, contentType, fileName);
    }
}