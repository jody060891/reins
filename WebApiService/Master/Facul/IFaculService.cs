using System.Collections.Generic;
using Core.DTO.Master;
using Core;

namespace WebApiService.Master.Facul
{
    public interface IFaculService
    {
        BaseOperationResultModel Save(FaculModel facul);
        BaseOperationResultModel Delete(FaculModel facul);
        List<FaculModel> FetchAll();

        List<FaculModel> FetchAllProportionalWithPagination(ref BaseQueryModel searchQuery, FaculModel faculSearch); 
        int CountAllData();


    }
}
