using System.Collections.Generic;
using Core.DTO.Master;
using Core;

namespace WebApiService.Master.Occupation
{
    public interface IOccupationService
    {
        BaseOperationResultModel Save(OccupationModel occupation);
        BaseOperationResultModel Delete(OccupationModel occupation);
        OccupationByYearModel FetchOccupationByYear(int year);
        List<OccupationAllByYearGraphMorrisModel> FetchByYearGraphMorris();
        List<OccupationAllByYearGraphMorrisModel> FetchOccupByYearGraphMorris(string occup, long? tahunAwal, long? tahunAkhir);
        List<OccupationAllByYearGraphMorrisModel> FetchOccupByMonthGraphMorris(string occup, long? tahun);
        List<OccupationModel> FetchOccupationGroupWithPagination(ref BaseQueryModel searchQuery, string occup);
        List<OccupationByYearModel> FetchOccupationGroupMonthWithPagination(ref BaseQueryModel searchQuery, long? tahun, string occup);
        OccupationModel FetchOne(string occup);
        OccupationModel FetchOneByOccup(string occup);
        List<OccupationModel> FetchAll();
        List<OccupationModel> FetchAllByOccupation(string occup);
        List<OccupationModel> FetchAllWithPagination(ref BaseQueryModel searchQuery);
    }
}
