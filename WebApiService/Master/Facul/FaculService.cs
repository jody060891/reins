using System;
using System.Collections.Generic;
using System.Linq;
using Core;
using Core.DTO.Master;
using WebApiService.Security;
using EF.Database.master;

namespace WebApiService.Master.Facul
{
    public class FaculService : IFaculService
    {
        private readonly IRepository<EF.Database.master.Facul> _masterFaculRepository;
        private readonly ISecurityService _securityService;

        public FaculService(ISecurityService securityService, IRepository<EF.Database.master.Facul> masterFaculRepository)
        {
            _securityService = securityService;
            _masterFaculRepository = masterFaculRepository;
        }


        public BaseOperationResultModel Save(FaculModel data)
        {
            var result = new BaseOperationResultModel();
            try
            {
                var facul = _masterFaculRepository.Query().FirstOrDefault(e => e.FacCode.Equals(data.FacCode))?? new EF.Database.master.Facul();
                facul.CopyFrom(data);
                _masterFaculRepository.Save(facul);
                _masterFaculRepository.Commit();
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

        public BaseOperationResultModel Delete(FaculModel data)
        {
            var result = new BaseOperationResultModel();
            return result;
        }

        public List<FaculModel> FetchAll()
        {
            //var a = _masterFaculRepository.Query().Where(e => e.FacUsid.Contains("alim")).ToList();
            var result = _masterFaculRepository.Query().Where(e => e.FacUwriterName.Contains("ADE HERIYANI") && e.FacOfrDate.Value.Year == 2006 && e.FacOfrDate.Value.Month == 2).ToList()
                .Select(e =>
                {
                    var r = e.TransformTo<FaculModel>();
                    r.FacOfrNo = e.FacOfrNo.GetValueOrDefault();
                    r.MasterUwriter = e.MasterUwriter.TransformTo<UwriterModel>();
                    r.MasterSubtype = e.MasterSubType.TransformTo<SubtypeModel>();
                    return r;
                }).ToList();
            return result;
        }

        public List<FaculModel> FetchAllProportionalWithPagination(ref BaseQueryModel searchQuery, FaculModel faculSearch)
        {
            var result = _masterFaculRepository.Query().Where(e => e.FacType.Equals("PR"));
            var listAtk = new List<FaculModel>();


            result = BaseQueryExpression<EF.Database.master.Facul>.DefaultSearchQueryable(result, searchQuery);

            result = result.SearchByModel(faculSearch, result);
            searchQuery.total_data = result.Count();
            result = BaseQueryExpression<EF.Database.master.Facul>.DefaultSortQueryable(result, searchQuery);
            //
            //            result.Where(r => r.FacComDate ==  System.Data.Entity.DbFunctions.CreateDateTime());

            result = BaseQueryExpression<EF.Database.master.Facul>.DefaultPaginateQueryable(result, searchQuery);

            result.ToList()
                .ForEach(k =>
                {
                    var fac = ToModel(k);

                    listAtk.Add(fac);
                });

            return listAtk;
        }



        public FaculModel ToModel(EF.Database.master.Facul source)
        {
            var result = source.TransformTo<FaculModel>();
            if (source.MasterSubType != null)
                result.MasterSubtype = source.MasterSubType.TransformTo<SubtypeModel>();

            if (source.MasterUwriter != null)
                result.MasterUwriter = source.MasterUwriter.TransformTo<UwriterModel>();

            return result;
        }

        public int CountAllData()
        {
            var a = _masterFaculRepository.Query().Where(e => e.FacUwriterName.Contains("A") && e.FacOfrDate.Value.Year == 2006 && e.FacOfrDate.Value.Month == 2).Select(e => e.FacUwriterName)
                .ToList();
            return a.Count;
        }
    }
}
