using Autofac;
using Autofac.Integration.Mvc;
using Core;
using HITS.Security;
using WebApiService;
using WebApiService.Email;
using WebApiService.Email.EmailQueue;
using WebApiService.Master.Class;
using WebApiService.Master.Facul;
using WebApiService.Master.MainClass;
using WebApiService.Master.Occupation;
using WebApiService.Master.OpenCover;
using WebApiService.Master.Sterr;
using WebApiService.Master.SubType;
using WebApiService.Master.User;
using WebApiService.Security;
using WebApiService.Sys;

namespace HITS
{
    public class AutofacConfig
    {
        public static void Register(ContainerBuilder builder)
        {
            RegisterControllers(builder);
            RegisterServices(builder);
            builder.RegisterFilterProvider();
            builder.RegisterType<ContextProvider>().As<IContextProvider>().InstancePerHttpRequest();
        }

        public static void WireProperties(ContainerBuilder builder)
        {
            builder.RegisterType<WebApiAuthorizeAttribute>().PropertiesAutowired();
        }

        

        private static void RegisterControllers(ContainerBuilder builder)
        {
            builder.RegisterControllers(typeof(MvcApplication).Assembly);
        }

        private static void RegisterServices(ContainerBuilder builder)
        {
            builder.RegisterType<UserService>().As<IUserService>().InstancePerRequest();
            

            builder.RegisterType<SecurityService>().As<ISecurityService>().InstancePerRequest();
            builder.RegisterType<UserAuditTrailService>().As<IUserAuditTrailService>().InstancePerRequest();
            
            builder.RegisterType<FaculService>().As<IFaculService>().InstancePerRequest();
            builder.RegisterType<ModuleService>().As<IModuleService>().InstancePerRequest();
            builder.RegisterType<AtkJenisBisnisService>().As<IAtkJenisBisnisService>().InstancePerRequest();
            builder.RegisterType<AtkBhatkService>().As<IAtkBhatkService>().InstancePerRequest();
            builder.RegisterType<AtkBdatkService>().As<IAtkBdatkService>().InstancePerRequest();
            builder.RegisterType<OpenCoverService>().As<IOpenCoverService>().InstancePerRequest();
            builder.RegisterType<StatusService>().As<IStatusService>().InstancePerRequest();
            builder.RegisterType<CompanyService>().As<ICompanyService>().InstancePerRequest();
            builder.RegisterType<SubTypeService>().As<ISubTypeService>().InstancePerRequest();
            builder.RegisterType<ClassService>().As<IClassService>().InstancePerRequest();
            builder.RegisterType<MainClassService>().As<IMainClassService>().InstancePerRequest();
            builder.RegisterType<SterrService>().As<ISterrService>().InstancePerRequest();
            builder.RegisterType<OpenCoverDocumentService>().As<IOpenCoverDocumentService>().InstancePerRequest();

            builder.RegisterType<EmailService>().As<IEmailService>().InstancePerRequest();

            ServiceConfig.RegisterRepositories(builder);
        }
    }
}