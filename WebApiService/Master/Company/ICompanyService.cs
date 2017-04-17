using System.Collections.Generic;
using Core.DTO.Master;
using Core;

namespace WebApiService.Master.OpenCover
{
    public interface ICompanyService
    {
        List<CompanyModel> FetchAll();
        List<CompanyModel> FetchAllByCompCode(string compCode);

    }
}
