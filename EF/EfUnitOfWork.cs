using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Data.Entity;
using System.Data.Entity.Core.Objects;
using System.Diagnostics;
using System.Linq;
using Core;
using Core.DTO.Sys;
using EF.Database;

namespace EF
{
    public class EfUnitOfWork : IUnitOfWork
    {
        private readonly REINS_Database _context;
        private List<UserAuditTrailDetailModel> _changes; 

        public EfUnitOfWork(REINS_Database context)
        {
            Debug.WriteLine("uow created");
            context.Configuration.AutoDetectChangesEnabled = true;  
            _context = context;
            context.Database.Log += s => Debug.WriteLine(s);
            _changes = new List<UserAuditTrailDetailModel>();
        }

        public REINS_Database Context
        {
            get { return _context; }
        }

        public DbSet<T> GetDbSet<T>() where T : BaseEntityModel
        {
            return Context.Set<T>();
        }

        public DbSet<T> GetDbSetNew<T>() where T : BaseEntityNewModel
        {
            return Context.Set<T>();
        }

        public void Dispose()
        {
            Context.Dispose();
        }

        public void Commit()
        {
            Context.SaveChanges();
        }

        public List<UserAuditTrailDetailModel> GetAuditLogData()
        {
            return _changes;
        }

        public void TrackChanges()
        {
            var changeTrack = Context.ChangeTracker.Entries().Where(p => p.State == EntityState.Added || p.State == EntityState.Deleted || p.State == EntityState.Modified);
            foreach (var entry in changeTrack.Where(entry => entry.Entity != null))
            {
                string entityName;
                string state;
                var primaryKey = entry.Entity.GetType().GetProperties().FirstOrDefault(p => Attribute.IsDefined(p, typeof(KeyAttribute)));
                switch (entry.State)
                {
                    case EntityState.Modified:
                        entityName = ObjectContext.GetObjectType(entry.Entity.GetType()).Name;
                        state = entry.State.ToString();
                        foreach (var prop in entry.OriginalValues.PropertyNames.Where(p => p != "last_updated_date" && p != "last_updated_by"))
                        {
                            var currentValue = entry.CurrentValues[prop];
                            var originalValue = entry.OriginalValues[prop];
                            if (((currentValue == null && originalValue != null) || (currentValue != null && !currentValue.Equals(originalValue))))
                            {
                                _changes.Add(new UserAuditTrailDetailModel
                                {
                                    table_name = entityName,
                                    state = state,
                                    column_name = prop,
                                    original_value = Convert.ToString(originalValue),
                                    new_value = Convert.ToString(currentValue),
                                    row_id = (long)entry.CurrentValues[primaryKey.Name]
                                });
                            }
                        }
                        break;
                    case EntityState.Added:
                        entityName = ObjectContext.GetObjectType(entry.Entity.GetType()).Name;
                        state = entry.State.ToString();
                        foreach (var prop in entry.CurrentValues.PropertyNames)
                        {
                            _changes.Add(new UserAuditTrailDetailModel
                            {
                                table_name = entityName,
                                state = state,
                                column_name = prop,
                                original_value = string.Empty,
                                new_value = Convert.ToString(entry.CurrentValues[prop]),
                                row_id = (long)entry.CurrentValues[primaryKey.Name]
                            });

                        }
                        break;
                    case EntityState.Deleted:
                        entityName = ObjectContext.GetObjectType(entry.Entity.GetType()).Name;
                        if (
                            !(entityName.Equals("temp_sap_hr") || entityName.Equals("temp_sap_hr_history") ||
                              entityName.Equals("temp_sap_hr_history_detail")))
                        {
                            state = entry.State.ToString();
                            foreach (var prop in entry.OriginalValues.PropertyNames)
                            {
                                _changes.Add(new UserAuditTrailDetailModel
                                {
                                    table_name = entityName,
                                    state = state,
                                    column_name = prop,
                                    original_value = Convert.ToString(entry.OriginalValues[prop]),
                                    new_value = string.Empty,
                                    row_id = entry.GetDatabaseValues().GetValue<long>(primaryKey.Name)
                                    //(long)entry.CurrentValues[primaryKey.Name]
                                });

                            }
                        }
                        break;
                }
            }
        }
    }
}
