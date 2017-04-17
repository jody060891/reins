using System;
using System.Collections.Generic;
using System.ComponentModel;

namespace Core.DTO.Master
{
    public class UserModel
    {
        public long user_id { get; set; }

        public string username { get; set; }
        public string password { get; set; }
        public string name { get; set; }
        public string employee_id { get; set; }
        public string gender { get; set; }


        public string ip_address { get; set; }
        public string salt { get; set; }
        public string email { get; set; }
        public string activation_code { get; set; }
        public string forgotten_password_code { get; set; }
        public string forgotten_password_time { get; set; }
        public string remember_code { get; set; }
        public DateTime created_on { get; set; }
        public DateTime last_login { get; set; }
        public bool active { get; set; }
        public string first_name { get; set; }
        public string last_name { get; set; }
        public string company { get; set; }
        public string phone { get; set; }
        public string avatar { get; set; }
    }

    public class ReinsUserModel
    {
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

        public List<UserRoleModel> MasterUserRoles { get; set; } 
    }

}