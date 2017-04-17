using System;
using System.Collections.Generic;
using System.Linq;
using Core;
using Core.DTO.Master;
using WebApiService.Security;
using EF.Database.master;

namespace WebApiService.Master.Facul
{
    public class AtkBhatkService : IAtkBhatkService
    {
        private readonly IRepository<MasterAtkBhatk> _masterAtkBhatkRepository;
        private readonly ISecurityService _securityService;

        public AtkBhatkService(ISecurityService securityService, IRepository<MasterAtkBhatk> masterAtkBhatkRepository)
        {
            _securityService = securityService;
            _masterAtkBhatkRepository = masterAtkBhatkRepository;
        }


        public BaseOperationResultModel Save(AtkBhatkModel data)
        {
            var result = new BaseOperationResultModel();
            try
            {
                var facul = _masterAtkBhatkRepository.Query().FirstOrDefault(e => e.KdBisns.Equals(data.KdBisns))?? new MasterAtkBhatk();
                facul.CopyFrom(data);
                _masterAtkBhatkRepository.Save(facul);
                _masterAtkBhatkRepository.Commit();
                result.IsSuccess = true;
                result.Data = data;
            }
            catch (Exception ex)
            {
                result.IsSuccess = false;
                result.Message = ex.Message;
            }
            
            return result;
        }

        public BaseOperationResultModel Delete(AtkBhatkModel data)
        {
            var result = new BaseOperationResultModel();
            return result;
        }

        public List<AtkBhatkModel> FetchAll()
        {
            //var a = _masterAtkBhatkRepository.Query().Where(e => e.FacUsid.Contains("alim")).ToList();
            var a = _masterAtkBhatkRepository.Query().Where(e => e.NomAtk.Equals("FPB980209")).ToList();
            var result = _masterAtkBhatkRepository.Query().Where(e => e.NomAtk.Equals("FPB980209")).ToList()
                .Select(e =>
                {
                    var r = e.TransformTo<AtkBhatkModel>();
                    r.MasterAtkJenisBisnis = e.MasterAtkJenisBisnis.TransformTo<AtkJenisBisnisModel>();
                    r.MasterAtkBagian = e.MasterAtkBagian.TransformTo<AtkBagianModel>();
                    r.MasterAtkBdatk = e.MasterAtkBdatk.Select(at => at.TransformTo<AtkBdatkModel>()).ToList();
                    return r;
                }).ToList();
            return result;
        }
        
    }
}
