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
    public class ClassService : IClassService
    {
        private readonly IRepository<MasterClass> _masterClassRepository;
        private readonly ISecurityService _securityService;

        public ClassService(ISecurityService securityService, IRepository<MasterClass> masterClassRepository)
        {
            _securityService = securityService;
            _masterClassRepository = masterClassRepository;
        }

        

        public List<ClassModel> FetchAll()
        {
            var result = _masterClassRepository.Query().ToList()
                .Select(e =>
                {
                    var r = e.TransformTo<ClassModel>();
                    return r;
                }).ToList();
            return result;
        }

        public List<ClassModel> FetchAllByClassCode(string classCode)
        {
            var result = _masterClassRepository.Query().Where(e => e.ClassCode.ToLower().Contains(classCode.ToLower()) || e.ClassName.ToLower().Contains(classCode.ToLower())).ToList()
                 .Select(e =>
                 {
                     var r = e.TransformTo<ClassModel>();
                     return r;
                 }).ToList();
            return result;
        }



    }
}
