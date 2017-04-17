using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.DTO.Sys
{
    public class UserAuditTrailModel
    {
        public long user_audit_trail_id { get; set; }
        public DateTime action_date { get; set; }
        public long user_id { get; set; }
        public string user_name { get; set; }
        public string name { get; set; }
        public string action { get; set; }
        public string item_id { get; set; }
        public bool is_show_item_id { get; set; }
        public long? institution_id { get; set; }
        public long? application_id { get; set; }
    }

    public class UserAuditTrailSearchParamModel
    {
        public string name { get; set; }
        public DateTime date_from { get; set; }
        public DateTime date_to { get; set; }
        public string item_id { get; set; }
    }
}
