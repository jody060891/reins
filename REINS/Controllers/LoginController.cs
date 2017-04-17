using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Core;
using WebApiService.Master;

namespace HITS.Controllers
{
    public class LoginController : BaseController
    {
        

        public JsonResult FetchAll()
        {
            //var locations = _locationService.FetchAll();
            return JsonWithContext(null, JsonRequestBehavior.DenyGet);
        }
    }
}
