using System;
using System.Collections.Generic;
using System.ComponentModel;

namespace Core.DTO.Master
{
    public class MenuListRoleModel
    {
        public long MenuId { get; set; }
        public long RoleId { get; set; }
        public string MenuroleStatus { get; set; }
        public string FlagUpd { get; set; }
        public string FlagIns { get; set; }
        public string FlagDel { get; set; }
        public string FlagSel { get; set; }

        public MenuListModel MasterMenuList { get; set; }
        public RoleModel MasterRole { get; set; }
    }

    

}