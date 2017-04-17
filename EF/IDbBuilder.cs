using System.Data.Entity;
using Core;

namespace EF
{
    public interface IDbBuilder
    {
        void RegisterModels(DbModelBuilder modelBuilder);
        void Seed(DbContext context);
    }
}
