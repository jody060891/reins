using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Core;

namespace EF.Database.master
{
    public class irpc_sys_login_attempts : BaseEntityModel
    {
        [Key]
        public long login_attemp_id { get; set; }
        
        public long user_id { get; set; }
        public string ip_address { get; set; }
        public string login { get; set; }
        public DateTime time { get; set; }
        
        
    }
}