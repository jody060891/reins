using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.DTO.Sys
{
    public class UserAuditTrailDetailModel
    {
        public long user_audit_trail_detail_id { get; set; }
        public long row_id { get; set; }
        public string table_name { get; set; }
        public string column_name { get; set; }
        public string state { get; set; }
        public string original_value { get; set; }
        public string new_value { get; set; }
    }
}
