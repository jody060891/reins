using System.Web.Mvc;
using Core;
using WebApiService.Master.Treaty;

namespace PKBL.Controllers.Master
{
    public class TreatyController : BaseController
    {
        public const string ITEM_NAME = "Master Treaty";
        public readonly ITreatyService STreatyService;

        public TreatyController(ITreatyService sTreatyService)
        {
            STreatyService = sTreatyService;
        }

        public JsonResult FetchAll()
        {
            var companies = STreatyService.FetchAll();
            return JsonWithContext(companies, JsonRequestBehavior.DenyGet);
        }

        public JsonResult FetchAllByTreatyCode(string treatyCode)
        {
            var companies = STreatyService.FetchAllByTreatyCode(treatyCode);
            return JsonWithContext(companies, JsonRequestBehavior.DenyGet);
        }
        

    }
}
