using System;
using System.Collections.Generic;
using System.Data.Entity.Core.Objects;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.UI.WebControls;
using Core;
using Core.DTO.Master;
using Core.DTO.Sys;
using EF.Database;
using EF.Database.master;
using EF.Database.sys;
using EF.SP;
using WebApiService.Security;

namespace WebApiService.Sys
{
    public interface IModuleService
    {
        List<MenuListModel> FetchAllModule();
    }

    public class ModuleService : IModuleService
    {
        private readonly IRepository<MasterMenuList> MasterMenuListRepository;
        private readonly ISecurityService _securityService;

        public ModuleService(IRepository<MasterMenuList> masterMenuListRepository, ISecurityService securityService)
        {
            MasterMenuListRepository = masterMenuListRepository;
            _securityService = securityService;
        }

        public List<MenuListModel> FetchAllModule()
        {
            var currentMenuRole = _securityService.GetCurrentMenuListRole();
            var result = MasterMenuListRepository.Query();

            var a = result.ToList();
            var b =
                result.Where(mg => mg.MenuStatus.Equals("A") && mg.MenuParent == null && mg.MenuType.Equals("R"))
                    .ToList();
            var listMenu = new List<MenuListModel>();

            result.Where(mg => mg.MenuStatus.Equals("A") && mg.MenuParent == null && mg.MenuType.Equals("R"))
                .OrderBy(mg => mg.MenuParent).ThenBy(mg => mg.MenuId)
                .ToList()
                .ForEach(mg =>
                {
                    var menu = mg.TransformTo<MenuListModel>();
                    menu = TransformRoleListToMenuListModel(menu, currentMenuRole.FirstOrDefault(e => e.MenuId == mg.MenuId));
                    menu.ChildMenuList = new List<MenuListModel>();
                    menu.ChildMenuList = GenerateSubMenu(menu.ChildMenuList, mg, currentMenuRole);


                    listMenu.Add(menu);
                });

            return listMenu;
        }

        public List<MenuListModel> GenerateSubMenu(List<MenuListModel> menu, MasterMenuList source, List<MenuListRoleModel> menuRoleSource)
        {
            var subMenu = MasterMenuListRepository.Query().Where(e => e.MenuParent == source.MenuId).ToList().Where(e => menuRoleSource.Any(mr => mr.MenuId == e.MenuId)).OrderBy(e => e.MenuName);
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
    }
}
