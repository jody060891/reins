using System.Collections.Generic;
using Core.DTO.Master;
using Core;

namespace WebApiService.Master.StatLine
{
    public interface IStatLineService
    {
        List<StatLineModel> FetchAll();
        StatLineModel FetchOne(string lineCode);
        List<StatLineModel> FetchByLineCodeList(List<string> lineCodes);
        List<StatLineModel> FetchAllByLineCode(string lineCode);

    }
}
