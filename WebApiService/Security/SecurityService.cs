using System;
using System.Collections.Generic;
using System.Configuration;
using System.DirectoryServices;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Web.Security;
using Core;
using Core.DTO.Master;
using EF.Database.master;
using WebApiService.Master.User;
using System.Security.Cryptography;
using EF;
using EF.SP;
using NPOI.SS.Formula.Functions;

namespace WebApiService.Security
{
    public class SecurityService : ISecurityService
    {
        private readonly IRepository<MasterUser> _masterUserRepository;
        private readonly IRepository<Facul> _masterFaculRepository;
        private readonly IRepository<MasterStatement> _masterUwriterRepository;
        private readonly IRepository<MasterUserRole> _masterUserRoleRepository;
        private readonly IRepository<MasterMenuList> _masterMenuListRepository;
        private readonly IRepository<MasterSterr> _masterSteerRepository;
        private readonly IRepository<MasterStatus> _masterStatusRepository;
        private readonly IRepository<MasterCurrency> _masterCurrencyRepository;
        private readonly IRepository<MasterCompany> _masterCompanyRepository;
        private readonly IRepository<MasterClass> _masterClassRepository;
        private readonly IRepository<MasterTreaty> _masterTreatyRepository; 
        private readonly IContextProvider _contextProvider;
        private readonly ISpWrapper _spWrapper;



        public SecurityService(IRepository<MasterUser> masterUserRepository, 
            IContextProvider contextProvider, 
            ISpWrapper spWrapper, 
            
            IUserService userService, IRepository<Facul> masterFaculRepository, IRepository<MasterStatement> masterUwriterRepository, 
            IRepository<MasterUserRole> masterUserRoleRepository, IRepository<MasterMenuList> masterMenuListRepository, 
            IRepository<MasterSterr> masterSteerRepository, IRepository<MasterStatus> masterStatusRepository, 
            IRepository<MasterCurrency> masterCurrencyRepository, IRepository<MasterCompany> masterCompanyRepository, 
            IRepository<MasterClass> masterClassRepository, IRepository<MasterTreaty> masterTreatyRepository)
        {
            _masterUserRepository = masterUserRepository;
            _contextProvider = contextProvider;
            _spWrapper = spWrapper;
            _masterFaculRepository = masterFaculRepository;
            _masterUwriterRepository = masterUwriterRepository;
            _masterUserRoleRepository = masterUserRoleRepository;
            _masterMenuListRepository = masterMenuListRepository;
            _masterSteerRepository = masterSteerRepository;
            _masterStatusRepository = masterStatusRepository;
            _masterCurrencyRepository = masterCurrencyRepository;
            _masterCompanyRepository = masterCompanyRepository;
            _masterClassRepository = masterClassRepository;
            _masterTreatyRepository = masterTreatyRepository;
        }

        public bool Login(string UserName, string password, bool? isElo = false)
        {
            //            var user = _masterUserRepository.Query()
            //                .FirstOrDefault(e => e.UserId == UserName);
            //            if(user == null)
            //                throw new Exception("User does not exist");
            //
            //            
            //            var loginUser = _masterUserRepository.Query()
            //                        .FirstOrDefault(e => e.UserId == UserName && e.Pswd.Equals(pwd.ReinsUserEncryption()));
            //            if (loginUser == null) throw new Exception("Login failed. The User ID or Password is incorrect.");//throw new Exception("AD Authentication failed. Error : " + result.Message);

            if (isElo == null || !isElo.Value)
            {
                var pwd = password;
                var ldapServer = ConfigurationManager.AppSettings["LDAP_Server"];

                var entry = new DirectoryEntry(ldapServer, UserName, pwd);

                var ds = new DirectorySearcher(entry);

                var searchResult = ds.FindOne();

                if (searchResult != null)
                {
                    FormsAuthentication.SetAuthCookie(UserName.ToString(CultureInfo.InvariantCulture), false);
                    return true;
                }
            }
            else
            {
                FormsAuthentication.SetAuthCookie(UserName.ToString(CultureInfo.InvariantCulture), false);
                return true;
            }
            
            return false;
        }

        
        private void WriteLog(string filename, string message)
        {
            try
            {
                var logPath = ConfigurationManager.AppSettings["LOG_PATH"] + filename + "_" +
                              DateTime.Now.ToString("yyyyMMddhhmmss") + ".log";
                File.WriteAllText(logPath, message);
            }
            catch (Exception)
            {
                
            }
        }

        
        public void Logout()
        {
            FormsAuthentication.SignOut();
        }

        public void Logout(string UserName)
        {
        }

        public ReinsUserModel GetCurrentUser(bool? isElo = false)
        {
            if (!_contextProvider.IsAuthenticated()) return null;

            var userId = _contextProvider.GetCurrentUserId();
            var ReinsUserModel = new ReinsUserModel();
            if (isElo == null || !isElo.Value)
            {
                var user = _masterUserRepository.Query()
                    .FirstOrDefault(u => u.UserId.ToLower().Equals(userId.ToLower()));
                ReinsUserModel = user.TransformTo<ReinsUserModel>();
            }
            else
            {
                ReinsUserModel.UserId = userId;
            }
            
            
            return ReinsUserModel;
        }


        public List<string> GetCurrentUserAcl()
        {
            if (!_contextProvider.IsAuthenticated()) return null;

            var userId = _contextProvider.GetCurrentUserId();
            var user = _masterUserRepository.Query()
                .FirstOrDefault(u => u.UserId.Equals(userId));
            if (user == null) return null;


            var listAcl = new List<string>();
            


            return listAcl;
        }

        public List<MenuListRoleModel> GetCurrentMenuListRole()
        {
            var result = new List<MenuListRoleModel>();
            if (!_contextProvider.IsAuthenticated()) return null;

            var userId = _contextProvider.GetCurrentUserId();
            var user = _masterUserRepository.Query()
                .FirstOrDefault(u => u.UserId.ToLower().Equals(userId.ToLower()));

            if (user?.MasterUserRoles == null) return null;
            user.MasterUserRoles.Where(ur => ur.MasterRole.MasterMenuListRoles.Any()).ToList().ForEach(ur =>
            {
                ur.MasterRole.MasterMenuListRoles.ToList().ForEach(mr =>
                {
                    result.Add(mr.TransformTo<MenuListRoleModel>());
                });
            });

            return result;
        }

        public List<ReinsUserModel> TestConnection()
        {
            var a = _masterUserRepository.Query().ToList();
            var b = _masterUserRepository.Query().Where(e => e.Pswd.Equals("MUHAMMAD".ReinsUserEncryption())).ToList()
                .Select(e =>
                {
                    var user = e.TransformTo<ReinsUserModel>();
                    user.MasterUserRoles = e.MasterUserRoles.Select(ur =>
                    {
                        var userRole = ur.TransformTo<UserRoleModel>();
                        userRole.MasterRole = ur.MasterRole.TransformTo<RoleModel>();
                        var mainMenu =
                            ur.MasterRole.MasterMenuListRoles.Where(mlr => mlr.MasterMenuList.MenuParent == null);
//                        if (mainMenu.Any())
//                        {
////                            var menuList = new List<MenuListModel>();
////                            foreach (var m in mainMenu)
////                            {
////                                var MenuListRole = m.TransformTo<MenuListRoleModel>();
////                                MenuListRole.MasterMenuList = m.MasterMenuList.TransformTo<MenuListModel>();
////                                GenerateSubMenu(MenuListRole.MasterMenuList, m.MasterMenuList);
////                                userRole.MasterRole.MasterMenuListRoles.Add(MenuListRole);
////                            }
//                            foreach (var m in mainMenu)
//                            {
//                                var menuList = m.MasterMenuList.TransformTo<MenuListModel>();
//                                menuList.ChildMenuList =
//                                    m.MasterMenuList.ChildMenuList.Select(cml => cml.TransformTo<MenuListModel>()).ToList();
//                            }
//                        }


                        userRole.MasterRole.MasterMenuListRoles = ur.MasterRole.MasterMenuListRoles.Where(mlr => mlr.MasterMenuList.MenuParent == null).Select(mlr =>
                        {
                            var menuListRole = mlr.TransformTo<MenuListRoleModel>();
                            menuListRole.MasterMenuList = mlr.MasterMenuList.TransformTo<MenuListModel>();
                            menuListRole.MasterMenuList = TransformRoleListToMenuListModel(menuListRole.MasterMenuList,
                                menuListRole);
//                            menuListRole.MasterMenuList.ParentMenuList =
//                                mlr.MasterMenuList.ParentMenuList.TransformTo<MenuListModel>();
                            menuListRole.MasterMenuList.ChildMenuList = new List<MenuListModel>();
                            menuListRole.MasterMenuList.ChildMenuList =
                                GenerateSubMenu(menuListRole.MasterMenuList.ChildMenuList, mlr.MasterMenuList, ur.MasterRole.MasterMenuListRoles);
                            return menuListRole;
                        }).ToList();
                        return userRole;
                    }).ToList();
                    return user;
                }).ToList();
            
            return b;
        }
        
        public List<StatementModel> TestUWriter()
        {
           // var a = _masterUwriterRepository.Query().ToList();
            var b = _masterUwriterRepository.Query().Where(st => st.StatTrt.Equals("I0TH019A")).ToList()
                .Select(e =>
                {
                    var result = e.TransformTo<StatementModel>();
                    result.Treaty = e.Treaty.TransformTo<TreatyModel>();
                    result.Cedant = e.Cedant.TransformTo<CompanyModel>();
                    result.Currency = e.Currency.TransformTo<CurrencyModel>();
                    result.JenisPremi = e.JenisPremi.TransformTo<JenisPremiModel>();
                    result.Broker = e.Broker.TransformTo<CompanyModel>();
                    result.SubClass = e.SubClass.TransformTo<ClassModel>();

                    result.StatLine1 = e.StatLine1.TransformTo<StatLineModel>();
                    result.StatLine2 = e.StatLine2.TransformTo<StatLineModel>();
                    result.StatLine3 = e.StatLine3.TransformTo<StatLineModel>();
                    result.StatLine4 = e.StatLine4.TransformTo<StatLineModel>();
                    result.StatLine5 = e.StatLine5.TransformTo<StatLineModel>();
                    result.StatLine6 = e.StatLine6.TransformTo<StatLineModel>();
                    result.StatLine7 = e.StatLine7.TransformTo<StatLineModel>();
                    result.StatLine8 = e.StatLine8.TransformTo<StatLineModel>();
                    result.StatLine9 = e.StatLine9.TransformTo<StatLineModel>();
                    result.StatLine10 = e.StatLine10.TransformTo<StatLineModel>();
                    result.StatLine11 = e.StatLine11.TransformTo<StatLineModel>();
                    result.StatLine12 = e.StatLine12.TransformTo<StatLineModel>();
                    result.StatLine13 = e.StatLine13.TransformTo<StatLineModel>();
                    result.StatLine14 = e.StatLine14.TransformTo<StatLineModel>();
                    return result;
                }).ToList();
            return b;
        }

        public List<MenuListModel> TestMenuList()
        {
            var b = _masterMenuListRepository.Query().Where(e => e.MenuId == 1000).ToList()
                .Select(e =>
            {
                var menu = e.TransformTo<MenuListModel>();
                menu.ChildMenuList = _masterMenuListRepository.Query().Where(c => c.MenuParent == e.MenuId).OrderBy(c => c.MenuId).ToList()
                    .Select(c => c.TransformTo<MenuListModel>()).ToList();
                return menu;
            }).ToList();

            return b;
            
        }

        public List<SterrModel> TestSterr()
        {
            var b = _masterSteerRepository.Query().ToList().Select(e => e.TransformTo<SterrModel>()).ToList();
            return b;
        }

        public List<StatusModel> TestStatus()
        {
            var b = _masterStatusRepository.Query().ToList().Select(e => e.TransformTo<StatusModel>()).ToList();
            return b;
        }

        public List<CurrencyModel> TestCurrency()
        {
            var b = _masterCurrencyRepository.Query().ToList().Select(e => e.TransformTo<CurrencyModel>()).ToList();
            return b;
        }

        public List<CompanyModel> TestCompany()
        {
            var b = _masterCompanyRepository.Query().ToList().Select(e =>
            {
                var a = e.TransformTo<CompanyModel>();
                a.MasterCountry = e.MasterCountry.TransformTo<CountryModel>();
                return a;
            }).ToList();
            return b;
        }

        public List<ClassModel> TestClass()
        {
            var b = _masterClassRepository.Query().ToList().Select(e => e.TransformTo<ClassModel>()).ToList();
            return b;
        }

        public List<TreatyModel> TestTreaty()
        {
            var b = _masterTreatyRepository.Query().Where(e => e.TrtCode.Equals("I2TS020A")).ToList().Select(e =>
            {
                var a = e.TransformTo<TreatyModel>();
                a.MasterClass = e.MasterClass.TransformTo<ClassModel>();
                a.MasterCompany = e.MasterCompany.TransformTo<CompanyModel>();
                a.MasterCurrency = e.MasterCurrency.TransformTo<CurrencyModel>();
                a.MasterStatus = e.MasterStatus.TransformTo<StatusModel>();
                a.MasterSterr = e.MasterSterr.TransformTo<SterrModel>();
                a.MasterSubType = e.MasterSubType.TransformTo<SubtypeModel>();
                return a;
            }).ToList();
            return b;
        }

        public List<UserRoleModel> TestUserRole()
        {
            var b = _masterUserRoleRepository.Query().ToList().Select(e =>
            {
                var a = e.TransformTo<UserRoleModel>();
                a.MasterUser = e.MasterUser.TransformTo<UserModel>();
                a.MasterRole = e.MasterRole.TransformTo<RoleModel>();
                return a;
            }).ToList();
            return b;
        }

        public List<MenuListModel> GenerateSubMenu(List<MenuListModel> menu, MasterMenuList source, ICollection<MasterMenuListRole> menuRoleSource)
        {
            var subMenu = _masterMenuListRepository.Query().Where(e => e.MenuParent == source.MenuId).ToList().Where(e => menuRoleSource.Any(mr => mr.MenuId == e.MenuId)).OrderBy(e => e.MenuName);
            foreach (var sub in subMenu)
            {
                var menuRole = menuRoleSource.FirstOrDefault(e => e.MenuId == sub.MenuId).TransformTo<MenuListRoleModel>();

                var newSub = sub.TransformTo<MenuListModel>();
                newSub = TransformRoleListToMenuListModel(newSub, menuRole);
                newSub.ChildMenuList = new List<MenuListModel>();
                newSub.ChildMenuList = GenerateSubMenu(newSub.ChildMenuList, sub, menuRoleSource);
                menu.Add(newSub);
            }
            return menu;
        }

        public MenuListModel TransformRoleListToMenuListModel(MenuListModel result, MenuListRoleModel source)
        {
            result.FlagDel = source.FlagDel;
            result.FlagIns = source.FlagIns;
            result.FlagSel = source.FlagSel;
            result.FlagUpd = source.FlagUpd;
            result.MenuroleStatus = source.MenuroleStatus;
            return result;
        }

        public SearchResult TestLdapLogin(string username, string password)
        {
            var ldapServer = ConfigurationManager.AppSettings["LDAP_Server"];

            var entry = new DirectoryEntry(ldapServer, username, password);

            var ds = new DirectorySearcher(entry);

            var searchResult = ds.FindOne();
            return searchResult;
        }

        //        public void GenerateSubMenu(MenuListModel mainMenu, MasterMenuList menu)
        //        {
        //            foreach (var subMenu in menu.ChildMenuList)
        //            {
        ////                childList.Add(subMenu.TransformTo<MenuListModel>());
        ////                mainMenu.ChildMenuList = childList;
        ////                var childSubMenu = _masterMenuListRepository.Query().Where(e => e.MenuParent == subMenu.MenuId).ToList();
        ////                if (childSubMenu.Count > 0)
        ////                    GenerateSubMenu(mainMenu, subMenu);
        //            }
        //
        //        }

        public static string GetProperty(SearchResult searchResult, string PropertyName)
        {
            if (searchResult.Properties.Contains(PropertyName))
            {
                return searchResult.Properties[PropertyName][0].ToString();
            }
            else
            {
                return string.Empty;
            }
        }

        class LdapInfo
        {
            public string Name { get; set; }
            public long? DepartmentId { get; set; }
            public long? DesignationId { get; set; }
            public string Email { get; set; }
        }
    }
}
