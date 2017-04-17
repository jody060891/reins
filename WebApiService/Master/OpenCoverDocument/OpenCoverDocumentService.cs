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

namespace WebApiService.Master.Class
{
    public class OpenCoverDocumentService : IOpenCoverDocumentService
    {
        private readonly IRepository<MasterOpenCoverDoc> _masterOpenCoverDocRepository;
        private readonly ISecurityService _securityService;

        public OpenCoverDocumentService(ISecurityService securityService, IRepository<MasterOpenCoverDoc> masterOpenCoverDocRepository)
        {
            _securityService = securityService;
            _masterOpenCoverDocRepository = masterOpenCoverDocRepository;
        }

        

        public List<OpenCoverDocModel> FetchAll()
        {
            var result = _masterOpenCoverDocRepository.Query().ToList()
                .Select(e =>
                {
                    var r = e.TransformTo<OpenCoverDocModel>();
                    return r;
                }).ToList();
            return result;
        }

        public List<OpenCoverDocModel> FetchOpenCoverDocAllByOffNo(string offNo)
        {
            var result = _masterOpenCoverDocRepository.Query().Where(e => e.TrtimgCode.ToLower().Replace(" ", "").Equals(offNo.ToLower()) && e.TrtimgFile.StartsWith("OPN")).ToList()
                 .Select(e =>
                 {
                     var r = e.TransformTo<OpenCoverDocModel>();
                     return r;
                 }).ToList();
            return result;
        }



    }
}
