using System;
using System.Collections.Generic;
using System.ComponentModel;

namespace Core.DTO.Master
{
    public class RoleModel
    {
        public long RoleId { get; set; }
        public string RoleName { get; set; }
        public string RoleStatus { get; set; }
        public string UserUpdate { get; set; }

        public DateTime? UpdateDate { get; set; }

        public List<MenuListRoleModel> MasterMenuListRoles { get; set; }
    }

    

}