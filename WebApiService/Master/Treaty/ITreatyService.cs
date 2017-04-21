using System.Collections.Generic;
using Core.DTO.Master;
using Core;

namespace WebApiService.Master.Treaty
{
    public interface ITreatyService
    {
        List<TreatyModel> FetchAll();
        List<TreatyModel> FetchAllByTreatyCode(string treatyCode);

    }
}
