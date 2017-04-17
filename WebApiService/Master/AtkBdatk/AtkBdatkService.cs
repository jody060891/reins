using System;
using System.Collections.Generic;
using System.Linq;
using Core;
using Core.DTO.Master;
using WebApiService.Security;
using EF.Database.master;

namespace WebApiService.Master.Facul
{
    public class AtkBdatkService : IAtkBdatkService
    {
        private readonly IRepository<MasterAtkBdatk> _masterAtkBdatkRepository;
        private readonly ISecurityService _securityService;

        public AtkBdatkService(ISecurityService securityService, IRepository<MasterAtkBdatk> masterAtkBdatkRepository)
        {
            _securityService = securityService;
            _masterAtkBdatkRepository = masterAtkBdatkRepository;
        }


        public BaseOperationResultModel Save(AtkBdatkModel data)
        {
            var result = new BaseOperationResultModel();
            try
            {
                var facul = _masterAtkBdatkRepository.Query().FirstOrDefault(e => e.KdBisns.Equals(data.KdBisns))?? new MasterAtkBdatk();
                facul.CopyFrom(data);
                _masterAtkBdatkRepository.Save(facul);
                _masterAtkBdatkRepository.Commit();
                result.IsSuccess = true;
                result.Data = data;
            }
            catch (Exception ex)
            {
                result.IsSuccess = false;
                result.Message = ex.Message;
            }
            
            return result;
        }

        public BaseOperationResultModel Delete(AtkBdatkModel data)
        {
            var result = new BaseOperationResultModel();
            return result;
        }

        public List<AtkBdatkModel> FetchAll()
        {
            //var a = _masterAtkBdatkRepository.Query().Where(e => e.FacUsid.Contains("alim")).ToList();
            var a = _masterAtkBdatkRepository.Query().Where(e => e.NomAtk.Equals("FPB980209")).ToList();
            var result = _masterAtkBdatkRepository.Query().Where(e => e.NomAtk.Equals("FPB980209")).ToList()
                .Select(e =>
                {
                    var r = e.TransformTo<AtkBdatkModel>();
                    r.MasterAtkBhatk = e.MasterAtkBhatk.TransformTo<AtkBhatkModel>();
                    r.MasterAtkBhatk.MasterAtkJenisBisnis =
                        e.MasterAtkBhatk.MasterAtkJenisBisnis.TransformTo<AtkJenisBisnisModel>();
                    r.MasterAtkBhatk.MasterAtkBagian = e.MasterAtkBhatk.MasterAtkBagian.TransformTo<AtkBagianModel>();
                    return r;
                }).ToList();
            return result;
        }

        public List<AtkBdatkModel> FetchAllWithPagination(ref BaseQueryModel searchQuery, AtkBdatkSearchModel atkBdatkSearch)
        {
            var result = _masterAtkBdatkRepository.Query();
            var listAtk = new List<AtkBdatkModel>();

            

            result = BaseQueryExpression<MasterAtkBdatk>.DefaultSearchQueryable(result, searchQuery);
            result = Search(result, atkBdatkSearch);
            searchQuery.total_data = result.Count();
            result = BaseQueryExpression<MasterAtkBdatk>.DefaultSortQueryable(result, searchQuery);


            result = BaseQueryExpression<MasterAtkBdatk>.DefaultPaginateQueryable(result, searchQuery);

            result.ToList()
                .ForEach(k =>
                {
                    var atk = k.TransformTo<AtkBdatkModel>();
                    listAtk.Add(atk);
                });

            return listAtk;
        }

        public IQueryable<MasterAtkBdatk> Search(IQueryable<MasterAtkBdatk> result, AtkBdatkSearchModel atkBdatkSearch)
        {
            if (!string.IsNullOrEmpty(atkBdatkSearch.KdBisns))
                result = result.Where(e => e.KdBisns.Equals(atkBdatkSearch.KdBisns));

            if (!string.IsNullOrEmpty(atkBdatkSearch.KodeBag))
                result = result.Where(e => e.KodeBag.Equals(atkBdatkSearch.KodeBag));

            if (!string.IsNullOrEmpty(atkBdatkSearch.NmBag))
                result = result.Where(e => e.MasterAtkBhatk.MasterAtkBagian.NmBag.Equals(atkBdatkSearch.NmBag));

            if (!string.IsNullOrEmpty(atkBdatkSearch.NoFpb))
                result = result.Where(e => e.MasterAtkBhatk.NoFpb.Equals(atkBdatkSearch.NoFpb));

            if (!string.IsNullOrEmpty(atkBdatkSearch.UrutFpb))
                result = result.Where(e => e.MasterAtkBhatk.UrutFpb.Equals(atkBdatkSearch.UrutFpb));

            if (atkBdatkSearch.TgPemb != null)
            {
                result =
                   result.ToList().Where(
                       e => e.TgPemb.GetValueOrDefault().Date == atkBdatkSearch.TgPemb.GetValueOrDefault().Date).AsQueryable();
            }
               

            return result;
        } 
    }
}
