using System.ComponentModel.DataAnnotations;
using Core;

namespace EF.Database.sys
{
    public class irpc_sys_field_mapping : BaseEntityModel
    {
        [Key]
        public long field_mapping_id { get; set; }
        public string table_name { get; set; }
        public string field_name { get; set; }
        public string display_field_name { get; set; }
        public string display_page_name { get; set; }
        public string display_module_name { get; set; }
        public bool is_foreign_key { get; set; }
        public string foreign_key_table_name { get; set; }
        public string foreign_key_field_name { get; set; }
        public string foreign_key_field_to_display_name { get; set; }
        public bool is_identifier { get; set; }
        public string primary_key_field_name { get; set; }

    }
}
