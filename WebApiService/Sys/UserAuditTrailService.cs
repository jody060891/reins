using System;
using System.Collections.Generic;
using System.Data.Entity.Core.Objects;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.UI.WebControls;
using Core;
using Core.DTO.Sys;
using EF.Database;
using EF.Database.master;
using EF.Database.sys;
using EF.SP;
using WebApiService.Security;

namespace WebApiService.Sys
{
    public interface IUserAuditTrailService
    {
        void LogUserAction(string action, string itemId, bool isShowItemId = false);
        void LogUserAction(string action, string itemId, string userName, bool isShowItemId = false);
        void Save(UserAuditTrailModel data);
        void Delete(UserAuditTrailModel data);
        UserAuditTrailModel FetchOne(long id);
        List<UserAuditTrailModel> FetchAll();
        List<UserAuditTrailModel> FetchAllWithPagination(ref BaseQueryModel searchQuery, UserAuditTrailSearchParamModel searchParam);
        List<UserAuditTrailDetailMappingModel> FetchDetailFor(long id);

        string GenerateInsertActionString(string itemName);
        string GenerateUpdateActionString(string itemName);
        string GenerateDeleteActionString(string itemName);
        string GenerateRestoreActionString(string itemName);

    }

    public class UserAuditTrailService : IUserAuditTrailService
    {
        public const string INSERT_ACTION = "Add new data";
        public const string UPDATE_ACTION = "Update data";
        public const string DELETE_ACTION = "Delete data";
        public const string RESTORE_ACTION = "Restore data";
        private readonly IRepository<irpc_sys_user_audit_trail> _userAuditTrailRepository;
        private readonly ISecurityService _securityService;
        private readonly IRepository<MasterUser> _userRepository;
        private readonly IRepository<irpc_sys_user_audit_trail_detail> _userAuditTrailDetailRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly ISpWrapper _spWrapper;

        public UserAuditTrailService(IRepository<irpc_sys_user_audit_trail> userAuditTrailRepository,
            ISecurityService securityService, IRepository<MasterUser> userRepository,
            IRepository<irpc_sys_user_audit_trail_detail> userAuditTrailDetailRepository, IUnitOfWork unitOfWork,
            ISpWrapper spWrapper)
        {
            _userAuditTrailRepository = userAuditTrailRepository;
            _securityService = securityService;
            _userRepository = userRepository;
            _userAuditTrailDetailRepository = userAuditTrailDetailRepository;
            _unitOfWork = unitOfWork;
            _spWrapper = spWrapper;
        }

        public void LogUserAction(string action, string itemId, bool isShowItemId = false)
        {
            string userId = "";
            string userName = "",
                sName = "";

            try
            {
                var user = _securityService.GetCurrentUser();
                userId = user.UserId;
                
                var data = new UserAuditTrailModel()
                {
                    user_audit_trail_id = 0,
                    action_date = DateTime.Now,
                    user_id = 0,
                    user_name = userId,
                    name = sName,
                    action = action,
                    item_id = itemId,
                    is_show_item_id = isShowItemId
                };
                Save(data);
            }
            catch
            {
                
            }

            
        }

        public void LogUserAction(string action, string itemId, string userName, bool isShowItemId = false)
        {
            string userId = "";
            string sName = "";

            try
            {
                var user =
                    _userRepository.Query()
                        .FirstOrDefault(
                            u => userName.ToLower().Equals(u.UserId.ToLower()));
                userId = user.UserId;

                var data = new UserAuditTrailModel()
                {
                    user_audit_trail_id = 0,
                    action_date = DateTime.Now,
                    user_id = 0,
                    user_name = userId,
                    name = sName,
                    action = action,
                    item_id = itemId,
                    is_show_item_id = isShowItemId
                };
                Save(data);
            }
            catch
            {

            }

            
        }

        public void Save(UserAuditTrailModel data)
        {
            var dataUserAudit =
                _userAuditTrailRepository.Query().FirstOrDefault(u => u.user_audit_trail_id == data.user_audit_trail_id) ??
                new irpc_sys_user_audit_trail();
            dataUserAudit.CopyFrom(data);
            _unitOfWork.GetAuditLogData().ForEach(d =>
            {
                var detail = new irpc_sys_user_audit_trail_detail();
                detail.CopyFrom(d);
                detail.AuditTrail = dataUserAudit;
                _userAuditTrailDetailRepository.Save(detail);
            });
            _userAuditTrailRepository.Save(dataUserAudit);
            _userAuditTrailRepository.Commit();
        }

        public void Delete(UserAuditTrailModel data)
        {
            var userAudit = data.TransformTo<irpc_sys_user_audit_trail>();
            _userAuditTrailRepository.Delete(userAudit);
            _userAuditTrailRepository.Commit();
        }

        public UserAuditTrailModel FetchOne(long id)
        {
            return
                _userAuditTrailRepository.Query()
                    .FirstOrDefault(u => u.user_audit_trail_id == id)
                    .TransformTo<UserAuditTrailModel>();
        }

        public List<UserAuditTrailModel> FetchAll()
        {
            return
                _userAuditTrailRepository.Query()
                    .Select(u => u.TransformTo<UserAuditTrailModel>())
                    .ToList();
        } 

        public List<UserAuditTrailModel> FetchAllWithPagination(ref BaseQueryModel searchQuery, UserAuditTrailSearchParamModel searchParam)
        {
            var result = _userAuditTrailRepository.Query();
            var listData = new List<UserAuditTrailModel>();

            result = result.Where(e => EntityFunctions.TruncateTime(e.action_date) >= searchParam.date_from.Date && EntityFunctions.TruncateTime(e.action_date) <= searchParam.date_to.Date);
            if (!String.IsNullOrEmpty(searchParam.name))
            {
                result = result.Where(e => e.name.ToLower().Contains(searchParam.name.ToLower()));
            }
            if (!String.IsNullOrEmpty(searchParam.item_id))
            {
                result = result.Where(e => e.item_id.ToLower().Contains(searchParam.item_id.ToLower()));
            }

            
            var userids = _userRepository.Query().Select(e => e.UserId);
            result = result.Where(e => userids.Contains(e.user_name) && (e.AuditTrailDetails.Count == 0 || e.AuditTrailDetails.Any(d => d.table_name != "incident_rca_history")));

            result = BaseQueryExpression<irpc_sys_user_audit_trail>.DefaultSearchQueryable(result, searchQuery);
            searchQuery.total_data = result.Count();
            result = BaseQueryExpression<irpc_sys_user_audit_trail>.DefaultSortQueryable(result, searchQuery);
            result = BaseQueryExpression<irpc_sys_user_audit_trail>.DefaultPaginateQueryable(result, searchQuery);

            result.ToList()
                .ForEach(k =>
                {
                    var loc = k.TransformTo<UserAuditTrailModel>();
                    listData.Add(loc);
                });

            return listData;
        }

        public List<UserAuditTrailDetailMappingModel> FetchDetailFor(long id)
        {
            var sp = new sys_user_audit_trail_detail_fetch_with_mapping()
            {
                p_user_audit_trail_id = id
            };

            var result = _spWrapper.ExecuteQueryStoredProcedure(sp);
            return result == null ? null : result.ToList();
        }

        public string GenerateInsertActionString(string itemName)
        {
            return String.Concat(INSERT_ACTION, " ", itemName);
        }

        public string GenerateUpdateActionString(string itemName)
        {
            return String.Concat(UPDATE_ACTION, " ", itemName);
        }

        public string GenerateDeleteActionString(string itemName)
        {
            return String.Concat(DELETE_ACTION, " ", itemName);
        }

        public string GenerateRestoreActionString(string itemName)
        {
            return String.Concat(RESTORE_ACTION, " ", itemName);
        }
    }
}
