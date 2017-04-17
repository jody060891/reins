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
    public class AtkJenisBisnisController : BaseController
    {
        public const string ITEM_NAME = "Master ATK Jenis Bisnis";
        public readonly IAtkJenisBisnisService SAtkJenisBisnisService;

        public AtkJenisBisnisController(IAtkJenisBisnisService sAtkJenisBisnisService)
        {
            SAtkJenisBisnisService = sAtkJenisBisnisService;
        }

        public JsonResult FetchAll()
        {
            var occupation = SAtkJenisBisnisService.FetchAll();
            return JsonWithContext(occupation, JsonRequestBehavior.DenyGet);
        }
        



    }
}
