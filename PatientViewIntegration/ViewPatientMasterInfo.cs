using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PatientViewIntegration
{
    public interface IViewPatientMasterInfo
    {
        DbSet<vw_PatientMasterInfo> Query();
    }

    public class ViewPatientMasterInfo : IViewPatientMasterInfo
    {
        private DbSet<vw_PatientMasterInfo> _context;

        public DbSet<vw_PatientMasterInfo> Query()
        {
            var ctx = new PATIENT_VIEW_Database();
            _context = ctx.vw_PatientMasterInfo;
            return _context;
        }
    }
}
