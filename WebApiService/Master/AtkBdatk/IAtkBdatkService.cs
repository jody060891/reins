using System.Collections.Generic;
using Core.DTO.Master;
using Core;

namespace WebApiService.Master.Facul
{
    public interface IAtkBdatkService
    {
        BaseOperationResultModel Save(AtkBdatkModel atk);
        BaseOperationResultModel Delete(AtkBdatkModel atk);
        List<AtkBdatkModel> FetchAll();

        List<AtkBdatkModel> FetchAllWithPagination(ref BaseQueryModel searchQuery, AtkBdatkSearchModel atkBdatkSearch);

    }
}
