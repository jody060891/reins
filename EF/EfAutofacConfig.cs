using Autofac;
using Core;
using EF.Database;

namespace EF
{
    public class EfAutofacConfig
    {
        public static void Register(ContainerBuilder builder)
        {
            builder.RegisterGeneric(typeof(EfRepository<>)).As(typeof(IRepository<>)).InstancePerRequest();
            builder.RegisterGeneric(typeof(EfNullRepository<>)).As(typeof(IRepositoryNew<>)).InstancePerRequest();
            builder.RegisterType<EfUnitOfWork>().As(typeof(IUnitOfWork)).InstancePerRequest();
            
            builder.RegisterType<REINS_Database>();
        }
    }
}
