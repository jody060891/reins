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
    public class StatusController : BaseController
    {
        public const string ITEM_NAME = "Master Status";
        public readonly IStatusService SStatusService;

        public StatusController(IStatusService sStatusService)
        {
            SStatusService = sStatusService;
        }

        public JsonResult FetchAll()
        {
            var occupation = SStatusService.FetchAll();
            return JsonWithContext(occupation, JsonRequestBehavior.DenyGet);
        }
        

    }
}
