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

namespace WebApiService.Master.Statement
{
    public class StatementService : IStatementService
    {
        private readonly IRepository<MasterStatement> _masterStatementRepository;
        private readonly IOpenCoverDocumentService _openCoverDocService;
        private readonly ISecurityService _securityService;

        public StatementService(ISecurityService securityService, IRepository<MasterStatement> masterStatementRepository, IOpenCoverDocumentService openCoverDocService)
        {
            _securityService = securityService;
            _masterStatementRepository = masterStatementRepository;
            _openCoverDocService = openCoverDocService;
        }


        public BaseOperationResultModel Save(StatementModel data)
        {
            var result = new BaseOperationResultModel();
            try
            {
                var isNew = true;
                var facul = _masterStatementRepository.Query().FirstOrDefault(e => e.StatNo == data.StatNo);
                if (facul != null)
                {
                    isNew = false;

                }
                else
                {
                    facul = new MasterStatement();
                }

                facul.CopyFrom(data);
                _masterStatementRepository.Save(facul, isNew);
                _masterStatementRepository.Commit();
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

        public BaseOperationResultModel Delete(StatementModel data)
        {
            var result = new BaseOperationResultModel();
            return result;
        }

        public BaseOperationResultModel FetchOne(long statementNo)
        {
            var result = new BaseOperationResultModel();
            try
            {
                var openCover = _masterStatementRepository.Query().FirstOrDefault(e => e.StatNo == statementNo) ?? new MasterStatement();
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

        public List<StatementModel> FetchAll()
        {
            //var a = _masterStatementRepository.Query().Where(e => e.FacUsid.Contains("alim")).ToList();
            var a = _masterStatementRepository.Query().Where(e => e.StatTrt.Equals("O8FBA961")).ToList();
            var result = _masterStatementRepository.Query().Where(e => e.StatTrt.Equals("O8FBA961")).ToList()
                .Select(e =>
                {
                    var r = e.TransformTo<StatementModel>();
                    return r;
                }).ToList();
            return result;
        }

        public List<StatementModel> FetchAllWithPagination(ref BaseQueryModel searchQuery, StatementModel facOpnCode)
        {
            var result = _masterStatementRepository.Query();
            var listAtk = new List<StatementModel>();
            

            result = BaseQueryExpression<MasterStatement>.DefaultSearchQueryable(result, searchQuery);

            result = result.SearchByModel(facOpnCode, result);
            searchQuery.total_data = result.Count();
            result = BaseQueryExpression<MasterStatement>.DefaultSortQueryable(result, searchQuery);
//
//            result.Where(r => r.FacComDate ==  System.Data.Entity.DbFunctions.CreateDateTime());

            result = BaseQueryExpression<MasterStatement>.DefaultPaginateQueryable(result, searchQuery);

            result.ToList()
                .ForEach(k =>
                {
                    var atk = ToModel(k);

                    listAtk.Add(atk);
                });

            return listAtk;
        }

        public IQueryable<MasterStatement> SearchByModel(IQueryable<MasterStatement> source, StatementModel data)
        {
            
            return source;
        } 

        public StatementModel ToModel(MasterStatement data)
        {
            var result = data.TransformTo<StatementModel>();
            if(data.Broker != null)
                result.Broker = data.Broker.TransformTo<CompanyModel>();
            if(data.Cedant != null)
                result.Cedant = data.Cedant.TransformTo<CompanyModel>();
            if (data.Currency != null)
                result.Currency = data.Currency.TransformTo<CurrencyModel>();
            if (data.JenisPremi != null)
                result.JenisPremi = data.JenisPremi.TransformTo<JenisPremiModel>();
            
            if (data.SubClass != null)
                result.SubClass = data.SubClass.TransformTo<ClassModel>();
            if (data.Treaty != null)
                result.Treaty = data.Treaty.TransformTo<TreatyModel>();

            if (data.StatLine1 != null)
                result.StatLine1 = data.StatLine1.TransformTo<StatLineModel>();
            if (data.StatLine2 != null)
                result.StatLine2 = data.StatLine2.TransformTo<StatLineModel>();
            if (data.StatLine3 != null)
                result.StatLine3 = data.StatLine3.TransformTo<StatLineModel>();
            if (data.StatLine4 != null)
                result.StatLine4 = data.StatLine4.TransformTo<StatLineModel>();
            if (data.StatLine5 != null)
                result.StatLine5 = data.StatLine5.TransformTo<StatLineModel>();
            if (data.StatLine6 != null)
                result.StatLine6 = data.StatLine6.TransformTo<StatLineModel>();
            if (data.StatLine7 != null)
                result.StatLine7 = data.StatLine7.TransformTo<StatLineModel>();
            if (data.StatLine8 != null)
                result.StatLine8 = data.StatLine8.TransformTo<StatLineModel>();
            if (data.StatLine9 != null)
                result.StatLine9 = data.StatLine9.TransformTo<StatLineModel>();
            if (data.StatLine10 != null)
                result.StatLine10 = data.StatLine10.TransformTo<StatLineModel>();
            if (data.StatLine11 != null)
                result.StatLine11 = data.StatLine11.TransformTo<StatLineModel>();
            if (data.StatLine12 != null)
                result.StatLine12 = data.StatLine12.TransformTo<StatLineModel>();
            if (data.StatLine13 != null)
                result.StatLine13 = data.StatLine13.TransformTo<StatLineModel>();
            if (data.StatLine1 != null)
                result.StatLine14 = data.StatLine14.TransformTo<StatLineModel>();

            return result;
        }

        public IQueryable<T> SearchA(IQueryable<T> source, object data)
        {
            return source;
        }

        
    }
}
