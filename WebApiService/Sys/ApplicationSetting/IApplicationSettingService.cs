using System.Collections.Generic;
using Core.DTO.Sys;


namespace WebApiService.Sys
{
    public interface IApplicationSettingService
    {
        void Save(List<ApplicationSettingModel> applicationSettingModel);
        void Delete(ApplicationSettingModel applicationSettingModel);
        ApplicationSettingModel FetchOne(long applicationSettinId);
        List<ApplicationSettingModel> FetchAll();
    }
}
