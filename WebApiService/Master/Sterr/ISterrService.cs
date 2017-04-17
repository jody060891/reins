using System.Collections.Generic;
using Core.DTO.Master;
using Core;

namespace WebApiService.Master.Sterr
{
    public interface ISterrService
    {
        List<SterrModel> FetchAll();
        List<SterrModel> FetchAllBySterrCode(string mSterrCode);

    }
}
