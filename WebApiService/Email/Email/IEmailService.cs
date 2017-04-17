
using Core.DTO.Sys;
using System.Collections.Generic;
namespace WebApiService.Email
{
    public interface IEmailService
    {
        List<EmailContentModel> ReceiveEmail();
        EmailModel GetSetting();
    }
}
