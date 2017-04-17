using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using Core;
using Core.DTO.Master;
using EF.Database.master;

namespace WebApiService.Master.User
{
    public interface IUserService
    {
        void Save(ReinsUserModel data);
        void Delete(ReinsUserModel data);
        void UnDelete(ReinsUserModel data);
        ReinsUserModel FetchOne(string userId);
        List<ReinsUserModel> FetchAll();
        List<ReinsUserModel> FetchAllWithPagination(ref BaseQueryModel searchQuery);
        List<ReinsUserModel> FetchAllDeletedWithPagination(ref BaseQueryModel searchQuery);
        
    }

    public class UserService : IUserService
    {
        private readonly IRepository<MasterUser> rUser;



        public UserService(IRepository<MasterUser> masterUserRepository
            )
        {
            rUser = masterUserRepository;
            
        }


        public void Save(ReinsUserModel data)
        {
            var user = rUser.Query().FirstOrDefault(rg => rg.UserId == data.UserId) ?? new MasterUser();
            user.CopyFrom(data);
//            user.Name = data.FirstName + " " + data.LastName;
//            user.UserName = data.Email;
//            user.IpAddress = GetIPAddress();
//            user.Active = true;
//            user.IsActive = true;
//            user.CreatedBy = "_SYSTEM_";
//            user.CreatedDate = DateTime.Now;
//            user.LastUpdatedBy = "_SYSTEM_";
//            user.LastUpdatedDate = DateTime.Now;

            if (string.IsNullOrEmpty(user.UserId))
            {
                var userExists =
                    rUser.Query()
                        .FirstOrDefault(u => u.Email == user.Email);
                if (userExists != null)
                {
                    throw new Exception("Username already exists!");
                }
            }

            rUser.Save(user);
            rUser.Commit();
        }

        public void Delete(ReinsUserModel data)
        {
            var user = rUser.Query().FirstOrDefault(rg => rg.UserId == data.UserId);

            if (user != null)
            {
                rUser.SoftDelete(user);
                rUser.Commit();

            }
        }

        public void UnDelete(ReinsUserModel data)
        {
            var user = rUser.Query().FirstOrDefault(rg => rg.UserId.Equals(data.UserId));

            if (user != null)
            {
                rUser.Save(user);
                rUser.Commit();

            }
        }

        public ReinsUserModel FetchOne(string userId)
        {
            var result = rUser.Query();
            var user = result.FirstOrDefault(e => e.UserId.Equals(userId));

            if (user == null) return null;
            var data = user.TransformTo<ReinsUserModel>();

            return data;
        }

        public List<ReinsUserModel> FetchAll()
        {
            var listUser = rUser.Query()
                .OrderBy(u => u.UserId);

            return toListModel(listUser);
        }

        public List<ReinsUserModel> FetchAllWithPagination(ref BaseQueryModel searchQuery)
        {
            var result = rUser.Query();
            var listUser = new List<ReinsUserModel>();
            
            result = BaseQueryExpression<MasterUser>.DefaultSearchQueryable(result, searchQuery);
            searchQuery.total_data = result.Count();
            result = BaseQueryExpression<MasterUser>.DefaultSortQueryable(result, searchQuery);
            result = BaseQueryExpression<MasterUser>.DefaultPaginateQueryable(result, searchQuery);

            listUser = toListModel(result);

            return listUser;
        }

        public List<ReinsUserModel> FetchAllDeletedWithPagination(ref BaseQueryModel searchQuery)
        {
            var result = rUser.Query();
            var listUser = new List<ReinsUserModel>();
            
            result = BaseQueryExpression<MasterUser>.DefaultSearchQueryable(result, searchQuery);
            searchQuery.total_data = result.Count();
            result = BaseQueryExpression<MasterUser>.DefaultSortQueryable(result, searchQuery);
            result = BaseQueryExpression<MasterUser>.DefaultPaginateQueryable(result, searchQuery);

            listUser = toListModel(result);

            return listUser;
        }

        public string GetIPAddress()
        {
            string IPAddress = "";
            IPHostEntry Host = default(IPHostEntry);
            string Hostname = null;
            Hostname = System.Environment.MachineName;
            Host = Dns.GetHostEntry(Hostname);
            foreach (IPAddress IP in Host.AddressList)
            {
                if (IP.AddressFamily == System.Net.Sockets.AddressFamily.InterNetwork)
                {
                    IPAddress = Convert.ToString(IP);
                }
            }
            return IPAddress;

        }


        public List<ReinsUserModel> toListModel(IQueryable<MasterUser> datum)
        {
            return datum.ToList().Select(ut =>
            {
                var um = ut.TransformTo<ReinsUserModel>();
                

                return um;
            }).ToList();
        }


    }
}
