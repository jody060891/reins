using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Core;

namespace EF.Database.master
{
    [Table("T_USR_PASWD")]
    public class MasterUser : BaseEntityModel
    {
        [Key]
        public string UserId { get; set; }
        
        public string Pswd { get; set; }

        public string OldPswd { get; set; }

        public string PswdStatus { get; set; }
        public DateTime? CreateDate { get; set; }
        public string UserUpdate { get; set; }
        public DateTime? UpdateDate { get; set; }
        public string DeptId { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }

        public virtual ICollection<MasterUserRole> MasterUserRoles { get; set; } 

    }
}