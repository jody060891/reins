using System;
using System.Collections.Generic;
using System.ComponentModel;

namespace Core.DTO.Master
{
    public class UserRoleModel
    {
        public string UserId { get; set; }
        public long RoleId { get; set; }
        public string UsrroleStatus { get; set; }

        public UserModel MasterUser { get; set; }
        public RoleModel MasterRole { get; set; }
    }

    

}