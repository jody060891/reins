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

namespace WebApiService.Master.SubType
{
    public class SubTypeService : ISubTypeService
    {
        private readonly IRepository<MasterSubType> _masterSubTypeRepository;
        private readonly ISecurityService _securityService;

        public SubTypeService(ISecurityService securityService, IRepository<MasterSubType> masterSubTypeRepository)
        {
            _securityService = securityService;
            _masterSubTypeRepository = masterSubTypeRepository;
        }

        

        public List<SubtypeModel> FetchAll()
        {
            var result = _masterSubTypeRepository.Query().ToList()
                .Select(e =>
                {
                    var r = e.TransformTo<SubtypeModel>();
                    return r;
                }).ToList();
            return result;
        }

        public List<SubtypeModel> FetchAllBySubTypeCode(string subTypeCode)
        {
            var result = _masterSubTypeRepository.Query().Where(e => e.SubtypeCode.ToLower().Contains(subTypeCode.ToLower()) || e.SubtypeDesc.ToLower().Contains(subTypeCode.ToLower())).ToList()
                 .Select(e =>
                 {
                     var r = e.TransformTo<SubtypeModel>();
                     return r;
                 }).ToList();
            return result;
        }



    }
}
