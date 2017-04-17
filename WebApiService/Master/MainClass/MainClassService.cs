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

namespace WebApiService.Master.MainClass
{
    public class MainClassService : IMainClassService
    {
        private readonly IRepository<MasterMainClass> _masterMainClassRepository;
        private readonly ISecurityService _securityService;

        public MainClassService(ISecurityService securityService, IRepository<MasterMainClass> masterMainClassRepository)
        {
            _securityService = securityService;
            _masterMainClassRepository = masterMainClassRepository;
        }

        

        public List<MainClassModel> FetchAll()
        {
            var result = _masterMainClassRepository.Query().ToList()
                .Select(e =>
                {
                    var r = e.TransformTo<MainClassModel>();
                    return r;
                }).ToList();
            return result;
        }

        public List<MainClassModel> FetchAllByMainClassCode(string mClassCode)
        {
            var result = _masterMainClassRepository.Query().Where(e => e.MclassCode.ToLower().Contains(mClassCode.ToLower()) || e.MclassName.ToLower().Contains(mClassCode.ToLower())).ToList()
                 .Select(e =>
                 {
                     var r = e.TransformTo<MainClassModel>();
                     return r;
                 }).ToList();
            return result;
        }



    }
}
