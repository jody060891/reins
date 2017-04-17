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
    public class AtkBhatkController : BaseController
    {
        public const string ITEM_NAME = "Master ATK BHATK";
        public readonly IAtkBhatkService SAtkBhatkService;

        public AtkBhatkController(IAtkBhatkService sAtkBhatkService)
        {
            SAtkBhatkService = sAtkBhatkService;
        }

        public JsonResult FetchAll()
        {
            var occupation = SAtkBhatkService.FetchAll();
            return JsonWithContext(occupation, JsonRequestBehavior.DenyGet);
        }
        



    }
}
