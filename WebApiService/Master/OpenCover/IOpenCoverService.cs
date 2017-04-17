using System.Collections.Generic;
using Core.DTO.Master;
using Core;

namespace WebApiService.Master.OpenCover
{
    public interface IOpenCoverService
    {
        BaseOperationResultModel Save(OpenCoverModel openCover);
        BaseOperationResultModel Delete(OpenCoverModel openCover);

        BaseOperationResultModel FetchOne(string openCover);
        List<OpenCoverModel> FetchAll();

        List<OpenCoverModel> FetchAllWithPagination(ref BaseQueryModel searchQuery, OpenCoverModel facOpnCode);

    }
}
