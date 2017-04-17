using System;
using System.Collections.Generic;
using System.Linq;
using Core;
using Core.DTO.Master;
using WebApiService.Security;
using EF.Database.master;

namespace WebApiService.Master.Occupation
{
    public class OccupationService : IOccupationService
    {
        private readonly IRepository<NL_MART_MC_LR_OCCP> _masterOccupationRepository;
        private readonly ISecurityService _securityService;

        public OccupationService(ISecurityService securityService, IRepository<NL_MART_MC_LR_OCCP> masterOccupationRepository)
        {
            _securityService = securityService;
            _masterOccupationRepository = masterOccupationRepository;
        }


        public BaseOperationResultModel Save(OccupationModel data)
        {
            var result = new BaseOperationResultModel();
            
            return result;
        }

        public BaseOperationResultModel Delete(OccupationModel data)
        {
            var result = new BaseOperationResultModel();
            
            return result;
        }

        public OccupationByYearModel FetchOccupationByYear(int year)
        {
            var result = new OccupationByYearModel();
            var occupList = _masterOccupationRepository.Query().Where(e => e.Yy == year);
            result.yy = year;
            result.claim = occupList.Sum(e => e.Claim).GetValueOrDefault();
            result.premi = occupList.Sum(e => e.Premi).GetValueOrDefault();
            result.loss_ratio = Math.Round((decimal)(result.claim*100/result.premi), 2);

            var occupListPrev = _masterOccupationRepository.Query().Where(e => e.Yy == year - 1);
            result.premi_prev = occupListPrev.Sum(e => e.Premi).GetValueOrDefault();
            result.claim_prev = occupListPrev.Sum(e => e.Claim).GetValueOrDefault();
            result.loss_ratio_prev = (decimal)Math.Round((double)(result.claim_prev*100/result.premi), 2);

            return result;
        }

        public List<OccupationAllByYearGraphMorrisModel> FetchByYearGraphMorris()
        {
            var result = new List<OccupationAllByYearGraphMorrisModel>();
            var occupList = _masterOccupationRepository.Query().GroupBy(e => e.Yy);
            occupList.ToList().ForEach(occ =>
            {
                var occupYear = new OccupationAllByYearGraphMorrisModel
                {
                    yy = occ.Key.GetValueOrDefault().ToString(),
                    
                };
                var premi = occ.Sum(e => e.Premi).GetValueOrDefault();
                var claim = occ.Sum(e => e.Claim).GetValueOrDefault();
                occupYear.l = Math.Round((double)(claim*100/premi), 2);

                result.Add(occupYear);
            });

            return result;
        }

        public List<OccupationAllByYearGraphMorrisModel> FetchOccupByYearGraphMorris(string occup, long? tahunAwal, long? tahunAkhir)
        {
            var init = 0;
            var result = new List<OccupationAllByYearGraphMorrisModel>();
            var occupQuery = _masterOccupationRepository.Query().Where(e => e.Occup.Equals(occup));
            if (tahunAwal > 0)
                occupQuery = occupQuery.Where(e => e.Yy >= tahunAwal);
            if (tahunAkhir > 0)
                occupQuery = occupQuery.Where(e => e.Yy <= tahunAkhir);
            var occupList = occupQuery.GroupBy(e => e.Yy).OrderBy(e => e.Key);
            
            occupList.ToList().ForEach(occ =>
            {
                var occupYear = new OccupationAllByYearGraphMorrisModel
                {
                    yy = occ.Key.GetValueOrDefault().ToString(),

                };
                occupYear.p = (double)occ.Sum(e => e.Premi).GetValueOrDefault();
                occupYear.c = (double)occ.Sum(e => e.Claim).GetValueOrDefault();
                occupYear.l = Math.Round(occupYear.c * 100 / occupYear.p, 2);
                if (init > 0)
                {
                    occupYear.t = Math.Round(result[init - 1].l + ((occupYear.l - result[init - 1].l)/2), 2);
                }
                else
                {
                    occupYear.t = Math.Round(occupYear.l/2, 2);
                }
                result.Add(occupYear);
                init++;
            });

            return result;
        }

        public List<OccupationAllByYearGraphMorrisModel> FetchOccupByMonthGraphMorris(string occup, long? tahun)
        {
            var init = 0;
            var today = new DateTime();
            var result = new List<OccupationAllByYearGraphMorrisModel>();
            var occupQuery = _masterOccupationRepository.Query().Where(e => e.Occup.Equals(occup));
            occupQuery = tahun > 0 ? occupQuery.Where(e => e.Yy == tahun) : occupQuery.Where(e => e.Yy == today.Year);

            occupQuery.OrderBy(e => e.Mm).ToList().ForEach(occ =>
            {
                var occupYear = new OccupationAllByYearGraphMorrisModel
                {
                    yy = occ.Yy.GetValueOrDefault().ToString()+"-"+occ.Mm,

                };
                occupYear.p = (double)occ.Premi.GetValueOrDefault();
                occupYear.c = (double)occ.Claim.GetValueOrDefault();
                occupYear.l = occupYear.p > 0 ? Math.Round(occupYear.c*100/occupYear.p, 2) : 0;
                
                occupYear.t = init > 0 ? Math.Round(result[init - 1].l + ((occupYear.l - result[init - 1].l) / 2), 2) : Math.Round(occupYear.l / 2, 2);
                result.Add(occupYear);
                init++;
            });

            return result;
        }

        public List<OccupationModel> FetchOccupationGroupWithPagination(ref BaseQueryModel searchQuery, string occup)
        {
            var result = _masterOccupationRepository.Query();
            var listOccupation = new List<OccupationModel>();
            

            if (!string.IsNullOrEmpty(occup))
                result = result.Where(e => e.Occup.Equals(occup));

            result = BaseQueryExpression<NL_MART_MC_LR_OCCP>.DefaultSearchQueryable(result, searchQuery);
            
            //            result = result.GroupBy(e => e.Occup).Select(c => c.FirstOrDefault()).ToList().AsQueryable();
            var resultNew = result.ToList().GroupBy(e => e.Occup).Select(c => c.FirstOrDefault());
            searchQuery.total_data = resultNew.Count();
            resultNew = BaseQueryExpression<NL_MART_MC_LR_OCCP>.DefaultSortQueryable(resultNew, searchQuery);


            resultNew = BaseQueryExpression<NL_MART_MC_LR_OCCP>.DefaultPaginateQueryable(resultNew, searchQuery);

            resultNew.ToList()
                .ForEach(k =>
                {
                    var occupation = k.TransformTo<OccupationModel>();
                    listOccupation.Add(occupation);
                });

            return listOccupation;
        }

        public List<OccupationByYearModel> FetchOccupationGroupMonthWithPagination(ref BaseQueryModel searchQuery, long? tahun, string occup)
        {
            var today = DateTime.Today;
            var result = _masterOccupationRepository.Query();
            var listOccupation = new List<OccupationByYearModel>();

            if (!string.IsNullOrEmpty(occup))
                result = result.Where(e => e.Occup.Equals(occup));

            if (tahun != null && tahun > 0)
            {
                result = result.Where(e => e.Yy == tahun);
            }
            else
            {
                result = result.Where(e => e.Yy == today.Year);
            }
            result = BaseQueryExpression<NL_MART_MC_LR_OCCP>.DefaultSearchQueryable(result, searchQuery);

            var resultNew = result.ToList().GroupBy(e => e.Occup).Select(c =>
            {
                var oc = c.FirstOrDefault().TransformTo<NL_MART_MC_LR_OCCP>();
                oc.Premi = c.Sum(e => e.Premi).GetValueOrDefault();
                oc.Claim = c.Sum(e => e.Claim).GetValueOrDefault();
                return oc;
            });
            searchQuery.total_data = resultNew.Count();
            resultNew = BaseQueryExpression<NL_MART_MC_LR_OCCP>.DefaultSortQueryable(resultNew, searchQuery);


            resultNew = BaseQueryExpression<NL_MART_MC_LR_OCCP>.DefaultPaginateQueryable(resultNew, searchQuery);

            
            resultNew.ToList()
                .ForEach(k =>
                {
                    var occupation = k.TransformTo<OccupationByYearModel>();
                    occupation.premi = k.Premi.GetValueOrDefault();
                    occupation.claim = k.Claim.GetValueOrDefault();
                    occupation.loss_ratio = (occupation.premi > 0) ? (decimal)Math.Round((double)(occupation.claim*100/occupation.premi), 2) : 0;
                    listOccupation.Add(occupation);
                });

            return listOccupation;
        }


        public OccupationModel FetchOne(string occup)
        {
            var occupation = _masterOccupationRepository.Query().FirstOrDefault(e => e.Occup.Equals(occup));
            if (occupation == null) return new OccupationModel();
            var data = occupation.TransformTo<OccupationModel>();

            return data;
        }

        public OccupationModel FetchOneByOccup(string occup)
        {
            var occupation = _masterOccupationRepository.Query().FirstOrDefault(e => e.Occup.Equals(occup));
            if (occupation == null) return new OccupationModel();
            var data = occupation.TransformTo<OccupationModel>();

            return data;
        }

        public List<OccupationModel> FetchAll()
        {
            var result = _masterOccupationRepository.Query();
            var listOccupation = new List<OccupationModel>();
            result
                .ToList()
                .ForEach(k =>
                {
                    var occupation = k.TransformTo<OccupationModel>();
                    listOccupation.Add(occupation);
                });

            return listOccupation;
        }

        public List<OccupationModel> FetchAllByOccupation(string occup)
        {
            var result = _masterOccupationRepository.Query();
            var listOccupation = new List<OccupationModel>();
            result.Where(e => e.Occup.Equals(occup))
                .ToList()
                .ForEach(k =>
                {
                    var occupation = k.TransformTo<OccupationModel>();
                    listOccupation.Add(occupation);
                });

            return listOccupation;
        }

        public List<OccupationModel> FetchAllWithPagination(ref BaseQueryModel searchQuery)
        {
            var result = _masterOccupationRepository.Query();
            var listOccupation = new List<OccupationModel>();
            
            result = BaseQueryExpression<NL_MART_MC_LR_OCCP>.DefaultSearchQueryable(result, searchQuery);
            searchQuery.total_data = result.Count();
            result = BaseQueryExpression<NL_MART_MC_LR_OCCP>.DefaultSortQueryable(result, searchQuery);


            result = BaseQueryExpression<NL_MART_MC_LR_OCCP>.DefaultPaginateQueryable(result, searchQuery);

            result.ToList()
                .ForEach(k =>
                {
                    var occupation = k.TransformTo<OccupationModel>();
                    listOccupation.Add(occupation);
                });

            return listOccupation;
        }
    }
}
