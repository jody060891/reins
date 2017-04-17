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
    public class CompanyController : BaseController
    {
        public const string ITEM_NAME = "Master Company";
        public readonly ICompanyService SCompanyService;

        public CompanyController(ICompanyService sCompanyService)
        {
            SCompanyService = sCompanyService;
        }

        public JsonResult FetchAll()
        {
            var companies = SCompanyService.FetchAll();
            return JsonWithContext(companies, JsonRequestBehavior.DenyGet);
        }

        public JsonResult FetchAllByCompCode(string compCode)
        {
            var companies = SCompanyService.FetchAllByCompCode(compCode);
            return JsonWithContext(companies, JsonRequestBehavior.DenyGet);
        }
        

    }
}
