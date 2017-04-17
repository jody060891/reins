using System;
using System.Web.Mvc;
using Core;
using Core.DTO.Master;
using WebApiService.Master.User;
using System.Collections.Generic;
using System.IO;
using System.Text.RegularExpressions;
using System.Web.UI;
using WebApiService.Sys;

namespace PKBL.Controllers.Master
{
    public class ModuleController : BaseController
    {
        public const string ITEM_NAME = "Module";
        private readonly IUserService sUser;
        private readonly IUserAuditTrailService _userAuditTrailService;
        private readonly IModuleService _moduleService;

        public ModuleController(IUserService userService, IUserAuditTrailService userAuditTrailService, IModuleService moduleService)
        {
            sUser = userService;
            _userAuditTrailService = userAuditTrailService;
            _moduleService = moduleService;
        }

        private void CreateSubModule(HtmlTextWriter htmlWriter, List<MenuListModel> modules, int parentIndex, string parentId, List<MenuListModel> accessModule)
        {
            parentIndex++;
            foreach (var subModule in modules)
            {
                Regex rgx = new Regex("[^a-zA-Z0-9 -]");
                var newModule = subModule;
                var dataTree = rgx.Replace(subModule.MenuName, "");
                var dataRoute = (!string.IsNullOrEmpty(subModule.ProgName)) ? rgx.Replace(subModule.ProgName.Split('.')[0], "") : null;
                newModule.ProgName = dataRoute;
                if (subModule.ChildMenuList.Count > 0)
                {
                    htmlWriter.AddAttribute(HtmlTextWriterAttribute.Class, "menu-children-" + parentIndex + " " + rgx.Replace(parentId.Replace(" ", ""), "")+ "-children list-group-item");
                    htmlWriter.AddAttribute("sidebar-tree", null);
                    htmlWriter.AddAttribute("sidebar-tree-children", dataTree.Replace(" ", "") + "-children");
                    
                }
                else
                {
                    htmlWriter.AddAttribute(HtmlTextWriterAttribute.Class, "menu-children-" + parentIndex + " " + rgx.Replace(parentId.Replace(" ", ""), "") + "-children list-group-item menu-click");
                    htmlWriter.AddAttribute("data-route", dataRoute);
                }
                
                htmlWriter.AddStyleAttribute(HtmlTextWriterStyle.Display, "none");
                htmlWriter.AddStyleAttribute(HtmlTextWriterStyle.Cursor, "pointer");
                htmlWriter.RenderBeginTag(HtmlTextWriterTag.A);
                htmlWriter.Write(subModule.MenuName);

                if (subModule.ChildMenuList.Count > 0)
                {
                    htmlWriter.AddAttribute(HtmlTextWriterAttribute.Class, "fa fa-plus-circle");
                    htmlWriter.AddStyleAttribute("float", "right");
                    htmlWriter.RenderBeginTag(HtmlTextWriterTag.I);
                    htmlWriter.RenderEndTag();
                }
                htmlWriter.RenderEndTag();
                accessModule.Add(newModule);
                if (subModule.ChildMenuList.Count > 0)
                {
                    CreateSubModule(htmlWriter, subModule.ChildMenuList, parentIndex, subModule.MenuName, accessModule);
                }
            }
//            htmlWriter.RenderEndTag();
        }

        public JsonResult RenderNavigation()
        {
            var result = new NavigationModel();
            try
            {
                var modules = _moduleService.FetchAllModule();
                var stringWriter = new StringWriter();
                var htmlWriter = new HtmlTextWriter(stringWriter);
                var accessModule = new List<MenuListModel>();
                
                foreach (var module in modules)
                {
                    var parentIndex = 0;
                    var newModule = module;
                    Regex rgx = new Regex("[^a-zA-Z0-9 -]");
                    var dataTree = rgx.Replace(module.MenuName, "");
                    var dataRoute = (!string.IsNullOrEmpty(module.ProgName))? rgx.Replace(module.ProgName.Split('.')[0], ""):null;
                    newModule.ProgName = dataRoute;
                    if (module.ChildMenuList.Count > 0)
                    {
                        
                        htmlWriter.AddAttribute(HtmlTextWriterAttribute.Class, "list-group-item");
                        htmlWriter.AddAttribute("sidebar-tree", null);
                        htmlWriter.AddAttribute("sidebar-tree-children", dataTree.Replace(" ", "") + "-children");
                    }
                    else
                    {
                        htmlWriter.AddAttribute(HtmlTextWriterAttribute.Class, "list-group-item menu-click");
                        htmlWriter.AddAttribute("data-route", dataRoute);
                        
                    }

                    htmlWriter.AddAttribute("ng-click", "test()");
                    htmlWriter.AddStyleAttribute(HtmlTextWriterStyle.Cursor, "pointer");
                    htmlWriter.RenderBeginTag(HtmlTextWriterTag.A);
                    htmlWriter.Write(module.MenuName);

                    if (module.ChildMenuList.Count > 0)
                    {
                        htmlWriter.AddAttribute(HtmlTextWriterAttribute.Class, "fa fa-plus-circle");
                        htmlWriter.AddStyleAttribute("float", "right");
                        htmlWriter.RenderBeginTag(HtmlTextWriterTag.I);
                        htmlWriter.RenderEndTag();
                    }
                    htmlWriter.RenderEndTag();

                    accessModule.Add(newModule);

                    if (module.ChildMenuList.Count > 0)
                    {
                        CreateSubModule(htmlWriter, module.ChildMenuList, parentIndex, module.MenuName, accessModule);
                    }
                    
                }
                result.RenderNavigation = stringWriter.ToString();
                result.AccessModule = accessModule;
                return JsonWithContext(result, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return JsonWithContext(null, JsonRequestBehavior.AllowGet);
            }
        }


    }
}
