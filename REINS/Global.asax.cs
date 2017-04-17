using System;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Routing;
using System.Web.Security;
using Autofac;
using Autofac.Integration.Mvc;
using HITS.ModelBindingFix;
using HITS.Utility.Elmah;
using log4net;
using log4net.Config;

[assembly: XmlConfigurator(Watch = true)]
namespace HITS
{
    // Note: For instructions on enabling IIS6 or IIS7 classic mode, 
    // visit http://go.microsoft.com/?LinkId=9394801
    public class MvcApplication : HttpApplication
    {
        private static readonly ILog Log = LogManager.GetLogger(typeof(MvcApplication));

        void Application_Error(Object sender, EventArgs e)
        {
            var ex = Server.GetLastError().GetBaseException();

            Log.Error("Application Error", ex);
        }

        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            WebApiConfig.Register(GlobalConfiguration.Configuration);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);

            var builder = new ContainerBuilder();
            AutofacConfig.Register(builder);
            ControllerBuilder.Current.SetControllerFactory(new ErrorHandlingControllerFactory());
            var container = builder.Build();
            DependencyResolver.SetResolver(new AutofacDependencyResolver(container));

            var jsonValueProviderFactory = ValueProviderFactories.Factories.OfType<JsonValueProviderFactory>().FirstOrDefault();
            ValueProviderFactories.Factories.Remove(jsonValueProviderFactory);
            ValueProviderFactories.Factories.Add(new FixedJsonValueProviderFactory());
            XmlConfigurator.Configure();
        }

        protected void Session_Start(object sender, EventArgs e)
        {
            HttpContext.Current.Request.Cookies.Remove(FormsAuthentication.FormsCookieName);
            //FormsAuthentication.SignOut();
        }
    }
}