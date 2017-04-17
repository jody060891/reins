using System;
using System.Web.Mvc;
using Core;
using Core.DTO.Master;
using WebApiService.Master.User;
using System.Collections.Generic;
using WebApiService.Sys;

namespace PKBL.Controllers.Master
{
    public class UserController : BaseController
    {
        public const string ITEM_NAME = "Master User";
        private readonly IUserService sUser;
        private readonly IUserAuditTrailService _userAuditTrailService;

        public UserController(IUserService userService, IUserAuditTrailService userAuditTrailService)
        {
            sUser = userService;
            _userAuditTrailService = userAuditTrailService;
        }

        public JsonResult FetchAll()
        {
            var users = sUser.FetchAll();
            return JsonWithContext(users, JsonRequestBehavior.DenyGet);
        }

        public JsonResult Save(ReinsUserModel data)
        {
            try
            {
                sUser.Save(data);
                _userAuditTrailService.LogUserAction(
                    string.IsNullOrEmpty(data.UserId)
                        ? _userAuditTrailService.GenerateUpdateActionString(ITEM_NAME)
                        : _userAuditTrailService.GenerateInsertActionString(ITEM_NAME),
                    data.UserId);
                var result = new BaseOperationResultModel()
                {
                    IsSuccess = true,
                    Message = "Data Saved Successfully"
                };

                return JsonWithContext(result, JsonRequestBehavior.DenyGet);
            }
            catch (Exception ex)
            {
                var result = new BaseOperationResultModel()
                {
                    IsSuccess = false,
                    Message = ex.Message
                };

                return JsonWithContext(result, JsonRequestBehavior.DenyGet);
            }
        }

        
        public JsonResult Delete(ReinsUserModel data)
        {
            _userAuditTrailService.LogUserAction(_userAuditTrailService.GenerateDeleteActionString(ITEM_NAME),
               data.UserId);
            sUser.Delete(data);
            return JsonWithContext(data, JsonRequestBehavior.DenyGet);
        }

        public JsonResult UnDelete(ReinsUserModel data)
        {
            sUser.UnDelete(data);
            _userAuditTrailService.LogUserAction("Undelete data Master User",
               data.UserId);
            return JsonWithContext(data, JsonRequestBehavior.DenyGet);
        }

        public JsonResult FetchAllWithPagination(BaseQueryModel searchQuery)
        {
            var Users = sUser.FetchAllWithPagination(ref searchQuery);
            return JsonWithContext(new Dictionary<string, object>
                {
                    {"list", Users},
                    {"totalData", searchQuery.total_data}
                }, JsonRequestBehavior.DenyGet);
        }

        public JsonResult FetchAllDeletedWithPagination(BaseQueryModel searchQuery)
        {
            var Users = sUser.FetchAllDeletedWithPagination(ref searchQuery);
            return JsonWithContext(new Dictionary<string, object>
                {
                    {"list", Users},
                    {"totalData", searchQuery.total_data}
                }, JsonRequestBehavior.DenyGet);
        }

    }
}
