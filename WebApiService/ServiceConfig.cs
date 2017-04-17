using Autofac;
using Core;
using EF;

namespace WebApiService
{
    public class ServiceConfig
    {
        public static void RegisterRepositories(ContainerBuilder builder)
        {
            builder.RegisterGeneric(typeof(EfRepository<>)).As(typeof(IRepository<>)).InstancePerRequest();
            builder.RegisterType<EfUnitOfWork>().As(typeof(IUnitOfWork)).InstancePerRequest();
            builder.RegisterType<REINS_Database>();
            builder.RegisterType<SpWrapper>().As(typeof (ISpWrapper)).InstancePerRequest();

        }
    }
}
