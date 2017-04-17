using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core;

namespace EF.Database.sys
{
    public class irpc_sys_user_audit_trail_detail : BaseEntityModel
    {
        [Key]
        public long user_audit_trail_detail_id { get; set; }

        public long row_id { get; set; }
        public string table_name { get; set; }
        public string column_name { get; set; }
        public string state { get; set; }
        public string original_value { get; set; }
        public string new_value { get; set; }
        public long? user_audit_trail_id { get; set; }
        public virtual irpc_sys_user_audit_trail AuditTrail { get; set; }
    }
}
