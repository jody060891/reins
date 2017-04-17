using System.Web.Mvc;
using Core;
using WebApiService.Master.MainClass;

namespace PKBL.Controllers.Master
{
    public class MainClassController : BaseController
    {
        public const string ITEM_NAME = "Master Main Class";
        public readonly IMainClassService SMainClassService;

        public MainClassController(IMainClassService sMainClassService)
        {
            SMainClassService = sMainClassService;
        }

        public JsonResult FetchAll()
        {
            var companies = SMainClassService.FetchAll();
            return JsonWithContext(companies, JsonRequestBehavior.DenyGet);
        }

        public JsonResult FetchAllByMainClassCode(string mClassCode)
        {
            var companies = SMainClassService.FetchAllByMainClassCode(mClassCode);
            return JsonWithContext(companies, JsonRequestBehavior.DenyGet);
        }
        

    }
}
