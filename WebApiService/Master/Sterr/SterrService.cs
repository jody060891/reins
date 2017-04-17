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

namespace WebApiService.Master.Sterr
{
    public class SterrService : ISterrService
    {
        private readonly IRepository<MasterSterr> _masterSterrRepository;
        private readonly ISecurityService _securityService;

        public SterrService(ISecurityService securityService, IRepository<MasterSterr> masterSterrRepository)
        {
            _securityService = securityService;
            _masterSterrRepository = masterSterrRepository;
        }

        

        public List<SterrModel> FetchAll()
        {
            var result = _masterSterrRepository.Query().ToList()
                .Select(e =>
                {
                    var r = e.TransformTo<SterrModel>();
                    return r;
                }).ToList();
            return result;
        }

        public List<SterrModel> FetchAllBySterrCode(string mSterrCode)
        {
            var result = _masterSterrRepository.Query().Where(e => e.SterrCode.ToLower().Contains(mSterrCode.ToLower()) || e.SterrName.ToLower().Contains(mSterrCode.ToLower())).ToList().OrderBy(st => st.SterrCode)
                 .Select(e =>
                 {
                     var r = e.TransformTo<SterrModel>();
                     return r;
                 }).ToList();
            return result;
        }



    }
}
