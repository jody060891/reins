using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Core;

namespace EF.Database.master
{
    [Table("T_ROLE")]
    public class MasterRole : BaseEntityModel
    {
        [Key]
        public long RoleId{ get; set; }
        public string RoleName { get; set; }
        public string RoleStatus{ get; set; }
        public string UserUpdate { get; set; }

        public DateTime? UpdateDate { get; set; }

        public virtual ICollection<MasterMenuListRole> MasterMenuListRoles { get; set; } 
    }
}