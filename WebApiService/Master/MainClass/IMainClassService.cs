using System.Collections.Generic;
using Core.DTO.Master;
using Core;

namespace WebApiService.Master.MainClass
{
    public interface IMainClassService
    {
        List<MainClassModel> FetchAll();
        List<MainClassModel> FetchAllByMainClassCode(string mClassCode);

    }
}
