using System.Collections.Generic;
using Core.DTO.Master;
using Core;

namespace WebApiService.Master.Facul
{
    public interface IAtkJenisBisnisService
    {
        BaseOperationResultModel Save(AtkJenisBisnisModel facul);
        BaseOperationResultModel Delete(AtkJenisBisnisModel facul);
        List<AtkJenisBisnisModel> FetchAll();


    }
}
