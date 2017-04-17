using System.Collections.Generic;
using System.Linq;


namespace Core
{
    public interface IRepository<TModel> where TModel : BaseEntityModel
    {
        void Save(TModel model);
        void Save(TModel model, bool isNew);
        void SaveFullDetail(TModel model);
        void BulkInsert(IEnumerable<TModel> range);
        void SoftDelete(TModel model);
        void Delete(TModel model);
        void BulkDelete(IEnumerable<TModel> model);
        IQueryable<TModel> Query();
        void Commit();
        void SetDefaultProp(ref TModel model, bool isAdd);
    }

    public interface IRepositoryNew<TModel> where TModel : BaseEntityNewModel
    {
        void Save(TModel model);
        void BulkInsert(IEnumerable<TModel> range);
        void SoftDelete(TModel model);
        void Delete(TModel model);
        void BulkDelete(IEnumerable<TModel> model);
        IQueryable<TModel> Query();
        void Commit();
        void SetDefaultProp(ref TModel model, bool isAdd);
    }
}
