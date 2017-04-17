using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Data.Entity;
using System.Data.Entity.Migrations;
using System.Diagnostics;
using System.Linq;
using System.Net;
using System.Runtime.Remoting;
using System.Web;
using Core;
using EF.Database;


namespace EF
{
    public class EfNullRepository<T> : IRepositoryNew<T> where T : BaseEntityNewModel
    {
        private readonly EfUnitOfWork _unitOfWork;
        private readonly DbSet<T> _dbSet;

        public EfNullRepository(IUnitOfWork unitOfWork)
        {
            Debug.WriteLine("repo created");
            _unitOfWork = (EfUnitOfWork)unitOfWork;
            _dbSet = _unitOfWork.GetDbSetNew<T>();
        }

        public void Save(T model)
        {
            var idProperty = typeof (T).GetProperties().FirstOrDefault(p => Attribute.IsDefined(p, typeof (KeyAttribute)));        
            if (idProperty != null && (long) idProperty.GetValue(model) > 0)
            {
                SetDefaultProp(ref model, false);
                _unitOfWork.Context.Entry(model).State = EntityState.Modified;         
                //InsertAuditTrailInfo(model, "Update");
            }
            else
            {
                SetDefaultProp(ref model, true);
                ActivateData(ref model);
                _dbSet.Add(model);
                //InsertAuditTrailInfo(model, "Insert");
            }
        }

        public void BulkInsert(IEnumerable<T> range)
        {
            var first = range.FirstOrDefault();
            if (first == null) return;

            range.ToList().ForEach(r =>
            {
                SetDefaultProp(ref r, true);
                ActivateData(ref r);
            });

            _dbSet.AddRange(range);
            //InsertAuditTrailInfo(first, "Add");
        }

        public void Delete(T model)
        {
            _dbSet.Remove(model);
            //InsertAuditTrailInfo(model, "Delete");
        }

        public void BulkDelete(IEnumerable<T> range)
        {
            var first = range.FirstOrDefault();
            if (first == null) return;

            _dbSet.RemoveRange(range);
            //InsertAuditTrailInfo(first, "Delete");
        }

        public void SoftDelete(T model)
        {
            DeactivateData(ref model);
            Save(model);
        }

        public IQueryable<T> Query()
        {
            return _dbSet;
        }

        public void Commit()
        {
            _unitOfWork.TrackChanges();
            _unitOfWork.Commit();
        }

        public void SetDefaultProp(ref T model, bool isAdd)
        {
        }

        private static void ActivateData(ref T model)
        {
        }

        private static void DeactivateData(ref T model)
        {
        }

        private void InsertAuditTrailInfo(T model, string activityType)
        {
//            var masterUserActivity = new master_user_activity();
//            var message = activityType + " data on " + model.GetType();
//
//            long userId = 0;
//            try
//            {
//                userId = long.Parse(HttpContext.Current.User.Identity.Name);
//            }
//            catch (Exception ex)
//            {
//            }
//
//            masterUserActivity.user_id = userId;
//            masterUserActivity.activity_description = message;
//            masterUserActivity.is_active = true;
//            masterUserActivity.created_by = HttpContext.Current.User.Identity.Name;
//            masterUserActivity.created_date = DateTime.Now;
//            masterUserActivity.last_updated_by = HttpContext.Current.User.Identity.Name;
//            masterUserActivity.last_updated_date = DateTime.Now;
//            _unitOfWork.Context.MasterUserActivities.Add(masterUserActivity);
        }
    }
}
