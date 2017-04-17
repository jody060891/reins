using System;
using System.Collections.Generic;
using Core.DTO.Sys;

namespace Core
{
    public interface IUnitOfWork : IDisposable
    {
        void Commit();
        List<UserAuditTrailDetailModel> GetAuditLogData();
        void TrackChanges();
    }
}
