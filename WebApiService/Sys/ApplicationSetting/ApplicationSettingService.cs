using System.Collections.Generic;
using System.Linq;
using Core;
using Core.DTO.Sys;
using EF.Database;
using EF.Database.sys;

namespace WebApiService.Sys.ApplicationSetting
{
    public class ApplicationSettingService : IApplicationSettingService
    {

         private readonly IRepository<sys_application_setting> _sysApplicationSettingRepository;

         public ApplicationSettingService(IRepository<sys_application_setting> sysApplicationSettingRepository)
        {
            _sysApplicationSettingRepository = sysApplicationSettingRepository;
        }


        public void Save(List<ApplicationSettingModel> data)
        {
            for (int i = 0; i <= data.Count; i++)
            {
                var applicationsetting = _sysApplicationSettingRepository.Query()
                            .FirstOrDefault(e => e.is_active && e.application_setting_id == data[i].application_setting_id);
                applicationsetting.CopyFrom(data[i]);

                _sysApplicationSettingRepository.Save(applicationsetting);
                _sysApplicationSettingRepository.Commit();
            }

        }

        public void Delete(ApplicationSettingModel data)
        {
            var applicationsetting = data.TransformTo<sys_application_setting>();

            _sysApplicationSettingRepository.SoftDelete(applicationsetting);
            _sysApplicationSettingRepository.Commit();
        }

        public ApplicationSettingModel FetchOne(long applicationsettingId)
        {
            var applicationsetting = _sysApplicationSettingRepository.Query().FirstOrDefault(e => e.is_active && e.application_setting_id == applicationsettingId);
            if (applicationsetting == null) return null;
            var data = applicationsetting.TransformTo<ApplicationSettingModel>();

            return data;
        }

        public List<ApplicationSettingModel> FetchAll()
        {
            var result = _sysApplicationSettingRepository.Query();
            var listApplicationSetting = new List<ApplicationSettingModel>();
            result.Where(e => e.is_active)
                .ToList()
                .ForEach(k =>
                {
                    var applicationsetting = k.TransformTo<ApplicationSettingModel>();
                    listApplicationSetting.Add(applicationsetting);
                });

            return listApplicationSetting;
        }

    }
}
