using System;
using System.Collections.Generic;
using System.DirectoryServices;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.DTO.Master;
using EF.Database;
namespace WebApiService.Security
{
    public interface ISecurityService
    {
        bool Login(string username, string password, bool? isElo = false);
        void Logout();

        ReinsUserModel GetCurrentUser(bool? isElo = false);
        List<string> GetCurrentUserAcl();
        List<MenuListRoleModel> GetCurrentMenuListRole();

        List<ReinsUserModel> TestConnection();
        List<StatementModel> TestUWriter();

        List<UserRoleModel> TestUserRole();
        List<MenuListModel> TestMenuList();
        List<SterrModel> TestSterr();
        List<StatusModel> TestStatus();
        List<CurrencyModel> TestCurrency();
        List<CompanyModel> TestCompany();
        List<ClassModel> TestClass();
        List<TreatyModel> TestTreaty();

        SearchResult TestLdapLogin(string username, string password);
    }
}
