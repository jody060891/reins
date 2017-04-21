using System;
using System.Web.Mvc;
using Core;
using Core.DTO.Master;
using System.Collections.Generic;
using WebApiService.Master.Facul;
using WebApiService.Master.Occupation;
using WebApiService.Master.OpenCover;
using WebApiService.Master.Statement;
using WebApiService.Sys;

namespace PKBL.Controllers.Master
{
    public class StatementController : BaseController
    {
        public const string ITEM_NAME = "Master Statement";
        public readonly IStatementService SStatementService;

        public StatementController(IStatementService sStatementService)
        {
            SStatementService = sStatementService;
        }

        public JsonResult Save(StatementModel statement)
        {
            var result = SStatementService.Save(statement);
            return JsonWithContext(result, JsonRequestBehavior.DenyGet);
        }

        public JsonResult FetchAll()
        {
            var occupation = SStatementService.FetchAll();
            return JsonWithContext(occupation, JsonRequestBehavior.DenyGet);
        }

        public JsonResult FetchOne(long statement)
        {
            var occupation = SStatementService.FetchOne(statement);
            return JsonWithContext(occupation, JsonRequestBehavior.DenyGet);
        }

        public JsonResult FetchAllWithPagination(BaseQueryModel searchQuery, StatementModel statementSearch)
        {
            var result = new BaseOperationResultModel();
            try
            {
                var statement = SStatementService.FetchAllWithPagination(ref searchQuery, statementSearch);
                result.IsSuccess = true;
                result.Data = new Dictionary<string, object>
                {
                    {"list", statement},
                    {"totalData", searchQuery.total_data}
                };
                return JsonWithContext(result, JsonRequestBehavior.DenyGet);
            }
            catch (Exception ex)
            {
                result.IsSuccess = false;
                result.Message = ex.Message;
                result.Data = ex;
                return JsonWithContext(result, JsonRequestBehavior.DenyGet);
            }
            
        }



    }
}
