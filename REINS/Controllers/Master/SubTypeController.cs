using System;
using System.Web.Mvc;
using Core;
using Core.DTO.Master;
using System.Collections.Generic;
using WebApiService.Master.Facul;
using WebApiService.Master.Occupation;
using WebApiService.Master.OpenCover;
using WebApiService.Master.SubType;
using WebApiService.Sys;

namespace PKBL.Controllers.Master
{
    public class SubTypeController : BaseController
    {
        public const string ITEM_NAME = "Master Sub Type";
        public readonly ISubTypeService SSubTypeService;

        public SubTypeController(ISubTypeService sSubTypeService)
        {
            SSubTypeService = sSubTypeService;
        }

        public JsonResult FetchAll()
        {
            var companies = SSubTypeService.FetchAll();
            return JsonWithContext(companies, JsonRequestBehavior.DenyGet);
        }

        public JsonResult FetchAllBySubTypeCode(string subTypeCode)
        {
            var companies = SSubTypeService.FetchAllBySubTypeCode(subTypeCode);
            return JsonWithContext(companies, JsonRequestBehavior.DenyGet);
        }
        

    }
}
