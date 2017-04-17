using System.Collections.Generic;
using Core.DTO.Master;
using Core;

namespace WebApiService.Master.Class
{
    public interface IClassService
    {
        List<ClassModel> FetchAll();
        List<ClassModel> FetchAllByClassCode(string classCode);

    }
}
