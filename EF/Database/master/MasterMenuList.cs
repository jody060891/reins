using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Core;

namespace EF.Database.master
{
    [Table("T_MENU_LIST")]

    public class MasterMenuList : BaseEntityModel
    {
        [Key]
        public long MenuId{ get; set; }
        public string MenuName { get; set; }
        public long? MenuParent{ get; set; }
        public string MenuType { get; set; }
        [StringLength(1)]
        public string MenuStatus { get; set; }
        public string MenuIcon { get; set; }
        public string ProgName { get; set; }
        public string UserUpdate { get; set; }

        public DateTime? UpdateDate { get; set; }
        
        public virtual MasterMenuList ParentMenuList { get; set; }

//        public virtual ICollection<MasterMenuList> ChildMenuList { get; set; } 
    }
}