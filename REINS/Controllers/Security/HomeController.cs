using System.Web.Mvc;

namespace HITS.Controllers
{
    public class HomeController : Controller
    {
        //
        // GET: /Home/

        public ActionResult Index()
        {
            return Redirect("/Web/index.html");
        }

        public ActionResult Login()
        {
            return Redirect("/Web/login.html");
        }

    }
}
