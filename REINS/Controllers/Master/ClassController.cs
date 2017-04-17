using System.Web.Mvc;
using Core;
using WebApiService.Master.Class;

namespace PKBL.Controllers.Master
{
    public class ClassController : BaseController
    {
        public const string ITEM_NAME = "Master Class";
        public readonly IClassService SClassService;

        public ClassController(IClassService sClassService)
        {
            SClassService = sClassService;
        }

        public JsonResult FetchAll()
        {
            var companies = SClassService.FetchAll();
            return JsonWithContext(companies, JsonRequestBehavior.DenyGet);
        }

        public JsonResult FetchAllByClassCode(string classCode)
        {
            var companies = SClassService.FetchAllByClassCode(classCode);
            return JsonWithContext(companies, JsonRequestBehavior.DenyGet);
        }
        

    }
}
