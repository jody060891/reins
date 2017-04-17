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

namespace WebApiService.Master.OpenCover
{
    public class CompanyService : ICompanyService
    {
        private readonly IRepository<MasterCompany> _masterCompanyRepository;
        private readonly ISecurityService _securityService;

        public CompanyService(ISecurityService securityService, IRepository<MasterCompany> masterCompanyRepository)
        {
            _securityService = securityService;
            _masterCompanyRepository = masterCompanyRepository;
        }

        

        public List<CompanyModel> FetchAll()
        {
            var result = _masterCompanyRepository.Query().ToList()
                .Select(e =>
                {
                    var r = e.TransformTo<CompanyModel>();
                    return r;
                }).ToList();
            return result;
        }

        public List<CompanyModel> FetchAllByCompCode(string compCode)
        {
            var result = _masterCompanyRepository.Query().Where(e => e.CompCode.ToLower().Contains(compCode.ToLower()) || e.CompName.ToLower().Contains(compCode.ToLower())).ToList()
                 .Select(e =>
                 {
                     var r = e.TransformTo<CompanyModel>();
                     return r;
                 }).ToList();
            return result;
        }
    }
}
