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

namespace WebApiService.Master.Treaty
{
    public class TreatyService : ITreatyService
    {
        private readonly IRepository<MasterTreaty> _masterTreatyRepository;
        private readonly ISecurityService _securityService;

        public TreatyService(ISecurityService securityService, IRepository<MasterTreaty> masterTreatyRepository)
        {
            _securityService = securityService;
            _masterTreatyRepository = masterTreatyRepository;
        }

        

        public List<TreatyModel> FetchAll()
        {
            var result = _masterTreatyRepository.Query().ToList()
                .Select(e =>
                {
                    var r = e.TransformTo<TreatyModel>();
                    return r;
                }).ToList();
            return result;
        }

        public List<TreatyModel> FetchAllByTreatyCode(string treatyCode)
        {
            var result = _masterTreatyRepository.Query().Where(e => e.TrtCode.ToLower().Contains(treatyCode.ToLower()) || e.TrtName.ToLower().Contains(treatyCode.ToLower())).ToList()
                 .Select(e =>
                 {
                     var r = e.TransformTo<TreatyModel>();
                     return r;
                 }).ToList();
            return result;
        }



    }
}
