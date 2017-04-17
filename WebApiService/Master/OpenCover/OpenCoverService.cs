using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Core.Objects;
using System.Data.Entity.SqlServer;
using System.Linq;
using Core;
using Core.DTO.Master;
using WebApiService.Security;
using EF.Database.master;
using NPOI.SS.Formula.Functions;
using WebApiService.Master.Class;

namespace WebApiService.Master.OpenCover
{
    public class OpenCoverService : IOpenCoverService
    {
        private readonly IRepository<MasterOpenCover> _masterOpenCoverRepository;
        private readonly IOpenCoverDocumentService _openCoverDocService;
        private readonly ISecurityService _securityService;

        public OpenCoverService(ISecurityService securityService, IRepository<MasterOpenCover> masterOpenCoverRepository, IOpenCoverDocumentService openCoverDocService)
        {
            _securityService = securityService;
            _masterOpenCoverRepository = masterOpenCoverRepository;
            _openCoverDocService = openCoverDocService;
        }


        public BaseOperationResultModel Save(OpenCoverModel data)
        {
            var result = new BaseOperationResultModel();
            try
            {
                var isNew = true;
                var facul = _masterOpenCoverRepository.Query().FirstOrDefault(e => e.FacOpnCode.Equals(data.FacOpnCode) && e.FacOfrNo == data.FacOfrNo);
                if (facul != null)
                {
                    isNew = false;

                }
                else
                {
                    facul = new MasterOpenCover();
                }

                facul.CopyFrom(data);
                _masterOpenCoverRepository.Save(facul, isNew);
                _masterOpenCoverRepository.Commit();
                result.IsSuccess = true;
                result.Data = data;

            }
            catch (Exception ex)
            {
                result.IsSuccess = false;
                result.Message = ex.Message;
                result.Data = ex;
            }
            
            return result;
        }

        public BaseOperationResultModel Delete(OpenCoverModel data)
        {
            var result = new BaseOperationResultModel();
            return result;
        }

        public BaseOperationResultModel FetchOne(string facOpnCode)
        {
            var result = new BaseOperationResultModel();
            try
            {
                var openCover = _masterOpenCoverRepository.Query().FirstOrDefault(e => e.FacOpnCode.Equals(facOpnCode)) ?? new MasterOpenCover();
                result.Data = ToModel(openCover);
                result.IsSuccess = true;
            }
            catch (Exception ex)
            {
                result.IsSuccess = false;
                result.Message = ex.Message;
                result.Data = ex;
            }

            return result;
        }

        public List<OpenCoverModel> FetchAll()
        {
            //var a = _masterOpenCoverRepository.Query().Where(e => e.FacUsid.Contains("alim")).ToList();
            var a = _masterOpenCoverRepository.Query().Where(e => e.FacOpnCode.Equals("O8FBA961")).ToList();
            var result = _masterOpenCoverRepository.Query().Where(e => e.FacOpnCode.Equals("O8FBA961")).ToList()
                .Select(e =>
                {
                    var r = e.TransformTo<OpenCoverModel>();
                    r.MasterSubType = e.MasterSubType.TransformTo<SubtypeModel>();
                    return r;
                }).ToList();
            return result;
        }

        public List<OpenCoverModel> FetchAllWithPagination(ref BaseQueryModel searchQuery, OpenCoverModel facOpnCode)
        {
            var result = _masterOpenCoverRepository.Query();
            var listAtk = new List<OpenCoverModel>();
            

            result = BaseQueryExpression<MasterOpenCover>.DefaultSearchQueryable(result, searchQuery);

            result = result.SearchByModel(facOpnCode, result);
            searchQuery.total_data = result.Count();
            result = BaseQueryExpression<MasterOpenCover>.DefaultSortQueryable(result, searchQuery);
//
//            result.Where(r => r.FacComDate ==  System.Data.Entity.DbFunctions.CreateDateTime());

            result = BaseQueryExpression<MasterOpenCover>.DefaultPaginateQueryable(result, searchQuery);

            result.ToList()
                .ForEach(k =>
                {
                    var atk = ToModel(k);

                    listAtk.Add(atk);
                });

            return listAtk;
        }

        public IQueryable<MasterOpenCover> SearchByModel(IQueryable<MasterOpenCover> source, OpenCoverModel data)
        {
            
            return source;
        } 

        public OpenCoverModel ToModel(MasterOpenCover data)
        {
            var result = data.TransformTo<OpenCoverModel>();
            if(data.MasterSubType != null)
                result.MasterSubType = data.MasterSubType.TransformTo<SubtypeModel>();
            if(data.MasterCompany != null)
                result.MasterCompany = data.MasterCompany.TransformTo<CompanyModel>();
            if (data.MasterBroker != null)
                result.MasterBroker = data.MasterBroker.TransformTo<CompanyModel>();
            if (data.MasterSterr != null)
                result.MasterSterr = data.MasterSterr.TransformTo<SterrModel>();
            if (data.MasterSubClass != null)
                result.MasterSubClass = data.MasterSubClass.TransformTo<ClassModel>();
            if (data.MasterMainClass != null)
                result.MasterMainClass = data.MasterMainClass.TransformTo<MainClassModel>();
            if (data.MasterStatus != null)
                result.MasterStatus = data.MasterStatus.TransformTo<StatusModel>();
            var documents = _openCoverDocService.FetchOpenCoverDocAllByOffNo(data.FacOfrNo.ToString());
            if (documents.Count > 0)
            {
                result.MasterDocuments = documents;
            }
            return result;
        }

        public IQueryable<T> SearchA(IQueryable<T> source, object data)
        {
            return source;
        }

        
    }
}
