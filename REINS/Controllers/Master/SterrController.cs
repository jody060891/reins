using System.Web.Mvc;
using Core;
using WebApiService.Master.MainClass;
using WebApiService.Master.Sterr;

namespace PKBL.Controllers.Master
{
    public class SterrController : BaseController
    {
        public const string ITEM_NAME = "Master Sterr";
        public readonly ISterrService SSterrService;

        public SterrController(ISterrService sSterrService)
        {
            SSterrService = sSterrService;
        }

        public JsonResult FetchAll()
        {
            var companies = SSterrService.FetchAll();
            return JsonWithContext(companies, JsonRequestBehavior.DenyGet);
        }

        public JsonResult FetchAllBySterrCode(string sterrCode)
        {
            var companies = SSterrService.FetchAllBySterrCode(sterrCode);
            return JsonWithContext(companies, JsonRequestBehavior.DenyGet);
        }
        

    }
}
