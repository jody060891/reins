using System.Collections.Generic;
using Core.DTO.Master;
using Core;

namespace WebApiService.Master.OpenCover
{
    public interface IStatusService
    {
        List<StatusModel> FetchAll();
        

    }
}
