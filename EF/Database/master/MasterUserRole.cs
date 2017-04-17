using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Core;

namespace EF.Database.master
{
    [Table("T_USRROLE")]
    public class MasterUserRole : BaseEntityModel
    {
        [Key, Column(Order = 0)]
        public string UserId{ get; set; }
        [Key, Column(Order = 1)]
        public long RoleId { get; set; }
        public string UsrroleStatus{ get; set; }

        public virtual MasterUser MasterUser { get; set; }
        public virtual MasterRole MasterRole { get; set; }
    }
}