using Microsoft.AspNetCore.Http;
using Workflow.Application.ViewModels;
using Workflow.Core.Models;

namespace Workflow.Application.Common.Interfaces;

public interface IExcelExporter
{
    Task<IResult> ExportUserObjectivesToExcel(User currentUser,
        List<UserAgenciesObjectivesViewModel> userAgenciesObjectives);
}