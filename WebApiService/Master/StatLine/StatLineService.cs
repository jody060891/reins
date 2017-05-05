using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Core.Objects;
using System.Data.Entity.SqlServer;
using System.Linq;
using System.Linq.Dynamic;
using Core;
using Core.DTO.Master;
using WebApiService.Security;
using EF.Database.master;
using NPOI.SS.Formula.Functions;

namespace WebApiService.Master.StatLine
{
    public class StatLineService : IStatLineService
    {
        private readonly IRepository<MasterStatLine> _masterStatLineRepository;
        private readonly ISecurityService _securityService;

        public StatLineService(ISecurityService securityService, IRepository<MasterStatLine> masterStatLineRepository)
        {
            _securityService = securityService;
            _masterStatLineRepository = masterStatLineRepository;
        }

        

        public List<StatLineModel> FetchAll()
        {
            var result = _masterStatLineRepository.Query().ToList()
                .Select(e =>
                {
                    var r = e.TransformTo<StatLineModel>();
                    return r;
                }).ToList();
            return result;
        }

        public StatLineModel FetchOne(string lineCode)
        {
            var result = _masterStatLineRepository.Query().FirstOrDefault(e => e.LineCode.Equals(lineCode)) ??
                         new MasterStatLine();
            return result.TransformTo<StatLineModel>();
        }

        public List<StatLineModel> FetchByLineCodeList(List<string> lineCodes)
        {
            var result = new List<StatLineModel>();
            var statLineSource = _masterStatLineRepository.Query();
            var query = "";
            lineCodes.ForEach(e =>
            {
                query += String.Format("LineCode.Equals(\"{0}\")", e);
                query += " || ";
            });
            if (query.Length > 4)
                query = query.Substring(0, query.Length - 4);
            //            SqlFunctions.DateAdd("day", 0, o.ReportDueDateTime)
            var searchExpression = query;
            statLineSource = !String.IsNullOrEmpty(searchExpression) ? statLineSource.Where(searchExpression) : statLineSource;

            result = statLineSource.OrderBy(e => e.LineCode).ToList().Select(e => e.TransformTo<StatLineModel>()).ToList();

            return result;
        }

        public List<StatLineModel> FetchAllByLineCode(string lineCode)
        {
            var result = _masterStatLineRepository.Query().Where(e => e.LineCode.ToLower().Contains(lineCode.ToLower()) || e.LineDesc.ToLower().Contains(lineCode.ToLower())).ToList()
                 .Select(e =>
                 {
                     var r = e.TransformTo<StatLineModel>();
                     return r;
                 }).ToList();
            return result;
        }



    }
}
