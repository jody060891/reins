using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.DTO.Sys
{
    public class UserAuditTrailDetailMappingModel
    {
        public long row_id { get; set; }
        public string table_name { get; set; }
        public string column_name { get; set; }
        public string display_field_name { get; set; }
        public string display_page_name { get; set; }
        public string display_module_name { get; set; }
        public string state { get; set; }
        public string original_value { get; set; }
        public string display_original_value { get; set; }
        public string new_value { get; set; }
        public string display_new_value { get; set; }
        public string display_column_id { get; set; }
        public string description { get; set; }
        public string last_updated_by { get; set; }
        public DateTime? last_updated_date { get; set; }
    }
}
