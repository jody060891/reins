using System;
using System.Web.Mvc;
using Core;
using Core.DTO.Master;
using System.Collections.Generic;
using WebApiService.Master.Facul;
using WebApiService.Master.Occupation;
using WebApiService.Sys;

namespace PKBL.Controllers.Master
{
    public class FaculController : BaseController
    {
        public const string ITEM_NAME = "Master Facul";
        public readonly IFaculService SFacul;

        public FaculController(IFaculService sFacul)
        {
            SFacul = sFacul;
        }

        public JsonResult FetchAll()
        {
            var occupation = SFacul.FetchAll();
            return JsonWithContext(occupation, JsonRequestBehavior.DenyGet);
        }

        public JsonResult FetchAllProportionalWithPagination(BaseQueryModel searchQuery, FaculModel faculSearch)
        {
            var result = new BaseOperationResultModel();
            try
            {
                var facul = SFacul.FetchAllProportionalWithPagination(ref searchQuery, faculSearch);
                result.IsSuccess = true;
                result.Data = new Dictionary<string, object>
                {
                    {"list", facul},
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

        public JsonResult CountAllData()
        {
            var occupation = SFacul.CountAllData();
            return JsonWithContext(occupation, JsonRequestBehavior.DenyGet);
        }



    }
}
