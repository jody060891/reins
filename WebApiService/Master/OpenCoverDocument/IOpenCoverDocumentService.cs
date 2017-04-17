using System.Collections.Generic;
using Core.DTO.Master;
using Core;

namespace WebApiService.Master.Class
{
    public interface IOpenCoverDocumentService
    {
        List<OpenCoverDocModel> FetchAll();
        List<OpenCoverDocModel> FetchOpenCoverDocAllByOffNo(string offNo);

    }
}
