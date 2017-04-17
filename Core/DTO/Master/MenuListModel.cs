using System;
using System.Collections.Generic;
using System.ComponentModel;

namespace Core.DTO.Master
{
    public class MenuListModel
    {
        public long MenuId { get; set; }
        public string MenuName { get; set; }
        public long? MenuParent { get; set; }
        public string MenuType { get; set; }
        public string MenuStatus { get; set; }
        public string MenuIcon { get; set; }
        public string ProgName { get; set; }
        public string UserUpdate { get; set; }

        public DateTime? UpdateDate { get; set; }

        public string MenuroleStatus { get; set; }
        public string FlagUpd { get; set; }
        public string FlagIns { get; set; }
        public string FlagDel { get; set; }
        public string FlagSel { get; set; }

        public MenuListModel ParentMenuList { get; set; }
        public List<MenuListModel> ChildMenuList { get; set; }
    }

    public class MenuListUserModel
    {
        public long MenuId { get; set; }
        public string MenuName { get; set; }
        public long? MenuParent { get; set; }
        public string MenuType { get; set; }
        public string MenuStatus { get; set; }
        public string MenuIcon { get; set; }
        public string ProgName { get; set; }
        public string UserUpdate { get; set; }

        public DateTime? UpdateDate { get; set; }

        public string MenuroleStatus { get; set; }
        public string FlagUpd { get; set; }
        public string FlagIns { get; set; }
        public string FlagDel { get; set; }
        public string FlagSel { get; set; }

        public MenuListModel ParentMenuList { get; set; }
        public List<MenuListModel> ChildMenuList { get; set; }
    }



}