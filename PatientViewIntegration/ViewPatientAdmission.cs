using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PatientViewIntegration
{
    public interface IViewPatientAdmission
    {
        DbSet<vw_KTPH_PatAdmission> Query();
    }

    public class ViewPatientAdmission : IViewPatientAdmission
    {
        private DbSet<vw_KTPH_PatAdmission> _context;

        public DbSet<vw_KTPH_PatAdmission> Query()
        {
            var ctx = new PATIENT_VIEW_Database();
            _context = ctx.vw_KTPH_PatAdmission;
            return _context;
        }
    }
}
