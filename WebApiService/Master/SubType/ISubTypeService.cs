using System.Collections.Generic;
using Core.DTO.Master;
using Core;

namespace WebApiService.Master.SubType
{
    public interface ISubTypeService
    {
        List<SubtypeModel> FetchAll();
        List<SubtypeModel> FetchAllBySubTypeCode(string subTypeCode);

    }
}
