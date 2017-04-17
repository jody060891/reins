using System;
using System.Web.Mvc;
using Core;
using Core.DTO.Master;
using System.Collections.Generic;
using WebApiService.Master.Facul;
using WebApiService.Master.Occupation;
using WebApiService.Master.OpenCover;
using WebApiService.Sys;

namespace PKBL.Controllers.Master
{
    public class OpenCoverController : BaseController
    {
        public const string ITEM_NAME = "Master Open Cover";
        public readonly IOpenCoverService SOpenCoverService;

        public OpenCoverController(IOpenCoverService sOpenCoverService)
        {
            SOpenCoverService = sOpenCoverService;
        }

        public JsonResult Save(OpenCoverModel opnCover)
        {
            var result = SOpenCoverService.Save(opnCover);
            return JsonWithContext(result, JsonRequestBehavior.DenyGet);
        }

        public JsonResult FetchAll()
        {
            var occupation = SOpenCoverService.FetchAll();
            return JsonWithContext(occupation, JsonRequestBehavior.DenyGet);
        }

        public JsonResult FetchOne(string facOpnCode)
        {
            var occupation = SOpenCoverService.FetchOne(facOpnCode);
            return JsonWithContext(occupation, JsonRequestBehavior.DenyGet);
        }

        public JsonResult FetchAllWithPagination(BaseQueryModel searchQuery, OpenCoverModel facOpnCode)
        {
            var result = new BaseOperationResultModel();
            try
            {
                var openCover = SOpenCoverService.FetchAllWithPagination(ref searchQuery, facOpnCode);
                result.IsSuccess = true;
                result.Data = new Dictionary<string, object>
                {
                    {"list", openCover},
                    {"totalData", searchQuery.total_data}
                };
                return JsonWithContext(result, JsonRequestBehavior.DenyGet);
            }
            catch (Exception ex)
            {
                result.IsSuccess = false;
                result.Message = ex.Message;
                result.Data = ex;
                return JsonWithContext(result, JsonRequestBehavior.DenyGet);
            }
            
        }



    }
}
