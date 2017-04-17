using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Core;

namespace EF.Database.master
{
    [Table("T_MENU_LISTROLE")]
    public class MasterMenuListRole : BaseEntityModel
    {
        [Key, Column(Order = 0)]
        public long MenuId{ get; set; }
        [Key, Column(Order = 1)]
        public long RoleId { get; set; }
        [StringLength(1)]
        public string MenuroleStatus{ get; set; }
        [StringLength(1)]
        public string FlagUpd { get; set; }
        [StringLength(1)]
        public string FlagIns { get; set; }
        [StringLength(1)]
        public string FlagDel { get; set; }
        [StringLength(1)]
        public string FlagSel { get; set; }

        public virtual MasterMenuList MasterMenuList { get; set; }
        public virtual MasterRole MasterRole { get; set; }
    }
}