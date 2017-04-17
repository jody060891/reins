using System;
using System.Collections.Generic;
using System.Linq;
using Core;
using Core.DTO.Master;
using WebApiService.Security;
using EF.Database.master;

namespace WebApiService.Master.Facul
{
    public class AtkJenisBisnisService : IAtkJenisBisnisService
    {
        private readonly IRepository<MasterAtkJenisBisnis> _masterAtkJenisBisnisRepository;
        private readonly ISecurityService _securityService;

        public AtkJenisBisnisService(ISecurityService securityService, IRepository<MasterAtkJenisBisnis> masterAtkJenisBisnisRepository)
        {
            _securityService = securityService;
            _masterAtkJenisBisnisRepository = masterAtkJenisBisnisRepository;
        }


        public BaseOperationResultModel Save(AtkJenisBisnisModel data)
        {
            var result = new BaseOperationResultModel();
            try
            {
                var facul = _masterAtkJenisBisnisRepository.Query().FirstOrDefault(e => e.KdBisns.Equals(data.KdBisns))?? new MasterAtkJenisBisnis();
                facul.CopyFrom(data);
                _masterAtkJenisBisnisRepository.Save(facul);
                _masterAtkJenisBisnisRepository.Commit();
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

        public BaseOperationResultModel Delete(AtkJenisBisnisModel data)
        {
            var result = new BaseOperationResultModel();
            return result;
        }

        public List<AtkJenisBisnisModel> FetchAll()
        {
            //var a = _masterAtkJenisBisnisRepository.Query().Where(e => e.FacUsid.Contains("alim")).ToList();
            var result = _masterAtkJenisBisnisRepository.Query().ToList()
                .Select(e =>
                {
                    var r = e.TransformTo<AtkJenisBisnisModel>();
                    return r;
                }).ToList();
            return result;
        }
        
    }
}
