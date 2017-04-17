using System;
using System.Web.Mvc;
using Core;
using Core.DTO.Master;
using System.Collections.Generic;
using WebApiService.Master.Occupation;
using WebApiService.Sys;

namespace PKBL.Controllers.Master
{
    public class OccupationController : BaseController
    {
        public const string ITEM_NAME = "Master Occupation";
        private readonly IOccupationService sOccupation;
        private readonly IUserAuditTrailService _userAuditTrailService;

        public OccupationController(IOccupationService occupationService, IUserAuditTrailService userAuditTrailService)
        {
            sOccupation = occupationService;
            _userAuditTrailService = userAuditTrailService;
        }

        public JsonResult FetchOccupationByYear(int year)
        {
            var occupation = sOccupation.FetchOccupationByYear(year);
            return JsonWithContext(occupation, JsonRequestBehavior.DenyGet);
        }

        public JsonResult FetchByYearGraphMorris()
        {
            var occupation = sOccupation.FetchByYearGraphMorris();
            return JsonWithContext(occupation, JsonRequestBehavior.DenyGet);
        }

        public JsonResult FetchOccupByYearGraphMorris(string occup, long? tahunAwal = 0, long? tahunAkhir = 0)
        {
            var occupation = sOccupation.FetchOccupByYearGraphMorris(occup, tahunAwal, tahunAkhir);
            return JsonWithContext(occupation, JsonRequestBehavior.DenyGet);
        }

        public JsonResult FetchOccupByMonthGraphMorris(string occup, long? tahun = 0)
        {
            var occupation = sOccupation.FetchOccupByMonthGraphMorris(occup, tahun);
            return JsonWithContext(occupation, JsonRequestBehavior.DenyGet);
        }

        public JsonResult FetchAll()
        {
            var wilayah = sOccupation.FetchAll();
            return JsonWithContext(wilayah, JsonRequestBehavior.DenyGet);
        }

        public JsonResult FetchAllByOccupation(string occup)
        {
            var occupation = sOccupation.FetchAllByOccupation(occup);
            return JsonWithContext(occupation, JsonRequestBehavior.DenyGet);
        }

        

        public JsonResult FetchAllWithPagination(BaseQueryModel searchQuery)
        {
            var occupation = sOccupation.FetchAllWithPagination(ref searchQuery);
            return JsonWithContext(new Dictionary<string, object>
                {
                    {"list", occupation},
                    {"totalData", searchQuery.total_data}
                }, JsonRequestBehavior.DenyGet);
        }

        public JsonResult FetchOccupationGroupWithPagination(BaseQueryModel searchQuery, string occup)
        {
            var occupation = sOccupation.FetchOccupationGroupWithPagination(ref searchQuery, occup);
            return JsonWithContext(new Dictionary<string, object>
                {
                    {"list", occupation},
                    {"totalData", searchQuery.total_data}
                }, JsonRequestBehavior.DenyGet);
        }

        public JsonResult FetchOccupationGroupMonthWithPagination(BaseQueryModel searchQuery, long? tahun, string occup)
        {
            var occupation = sOccupation.FetchOccupationGroupMonthWithPagination(ref searchQuery, tahun, occup);
            return JsonWithContext(new Dictionary<string, object>
                {
                    {"list", occupation},
                    {"totalData", searchQuery.total_data}
                }, JsonRequestBehavior.DenyGet);
        }

        public JsonResult FetchOneByOccup(string occup)
        {
            var occupation = sOccupation.FetchOneByOccup(occup);
            return JsonWithContext(occupation, JsonRequestBehavior.DenyGet);
        }

    }
}
