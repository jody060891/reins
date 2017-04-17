using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Core;

namespace EF.Database.sys
{
    public class irpc_sys_user_audit_trail : BaseEntityModel
    {
        [Key]
        public long user_audit_trail_id { get; set; }
        public DateTime action_date { get; set; }
        public long user_id { get; set; }
        public string user_name { get; set; }
        public string name { get; set; }
        public string action { get; set; }
        public string item_id { get; set; }
        public bool is_show_item_id { get; set; }

        public virtual IList<irpc_sys_user_audit_trail_detail> AuditTrailDetails { get; set; }
    }
}
