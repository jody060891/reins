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
    public class StatusService : IStatusService
    {
        private readonly IRepository<MasterStatus> _masterStatusRepository;
        private readonly ISecurityService _securityService;

        public StatusService(ISecurityService securityService, IRepository<MasterStatus> masterStatusRepository)
        {
            _securityService = securityService;
            _masterStatusRepository = masterStatusRepository;
        }

        

        public List<StatusModel> FetchAll()
        {
            var result = _masterStatusRepository.Query().ToList()
                .Select(e =>
                {
                    var r = e.TransformTo<StatusModel>();
                    return r;
                }).ToList();
            return result;
        }
        

        
    }
}
