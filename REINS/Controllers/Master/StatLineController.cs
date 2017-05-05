using System.Collections.Generic;
using System.Web.Mvc;
using Core;
using WebApiService.Master.StatLine;

namespace PKBL.Controllers.Master
{
    public class StatLineController : BaseController
    {
        public const string ITEM_NAME = "Master Class";
        public readonly IStatLineService SStatLineService;

        public StatLineController(IStatLineService sStatLineService)
        {
            SStatLineService = sStatLineService;
        }

        public JsonResult FetchAll()
        {
            var statLines = SStatLineService.FetchAll();
            return JsonWithContext(statLines, JsonRequestBehavior.DenyGet);
        }

        public JsonResult FetchAllByLineCode(string lineCode)
        {
            var statLines = SStatLineService.FetchAllByLineCode(lineCode);
            return JsonWithContext(statLines, JsonRequestBehavior.DenyGet);
        }

        public JsonResult FetchOne(string lineCode)
        {
            var result = SStatLineService.FetchOne(lineCode);
            return JsonWithContext(result, JsonRequestBehavior.DenyGet);
        }

        public JsonResult FetchByLineCodeList(List<string> lineCodes)
        {
            var result = SStatLineService.FetchByLineCodeList(lineCodes);
            return JsonWithContext(result, JsonRequestBehavior.DenyGet);
        }



    }
}
