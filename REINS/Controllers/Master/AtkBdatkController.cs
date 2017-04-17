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
    public class AtkBdatkController : BaseController
    {
        public const string ITEM_NAME = "Master ATK BDATK";
        public readonly IAtkBdatkService SAtkBdatkService;

        public AtkBdatkController(IAtkBdatkService sAtkBdatkService)
        {
            SAtkBdatkService = sAtkBdatkService;
        }

        public JsonResult FetchAll()
        {
            var occupation = SAtkBdatkService.FetchAll();
            return JsonWithContext(occupation, JsonRequestBehavior.DenyGet);
        }

        public JsonResult FetchAllWithPagination(BaseQueryModel searchQuery, AtkBdatkSearchModel atkBdatkSearch)
        {
            try
            {
                var result = SAtkBdatkService.FetchAllWithPagination(ref searchQuery, atkBdatkSearch);
                return JsonWithContext(new Dictionary<string, object>
                {
                    {"list", result},
                    {"totalData", searchQuery.total_data}
                }, JsonRequestBehavior.DenyGet);
            }
            catch (Exception ex)
            {
                return JsonWithContext(ex, JsonRequestBehavior.DenyGet);
            }
            
        }



    }
}
