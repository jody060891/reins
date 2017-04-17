using System.Collections.Generic;
using Core.DTO.Master;
using Core;

namespace WebApiService.Master.Facul
{
    public interface IAtkBhatkService
    {
        BaseOperationResultModel Save(AtkBhatkModel atk);
        BaseOperationResultModel Delete(AtkBhatkModel atk);
        List<AtkBhatkModel> FetchAll();


    }
}
