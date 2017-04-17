using System.Configuration;
using System.Globalization;
using System.Web.Mvc;
using Core;
using System.Web;
using System.IO;
using System.Text;
using Newtonsoft.Json;
using System.Collections.Generic;
using System;

namespace PKBL.Controllers.File
{
    public class FileController : BaseController
    {
        public const string openCoverDocFolderMain = "Open Cover";
        public const string folder = "";
        public const string reportFolder = "temp";
        public const string pdfFolder = "pdf";
        public const string xlsFolder = "xls";

        public FileController()
        {
        }

        

        public string Upload(HttpPostedFileBase file)
        {
            try
            {
                if (!Directory.Exists(Server.MapPath(folder))) Directory.CreateDirectory(Server.MapPath(folder));
                
                var fileName = Path.GetFileName(file.FileName);
                var path = Path.Combine(Server.MapPath(folder), fileName);
                file.SaveAs(path);

                var fi = new FileInfo(path);
                var fileSizeInBytes = fi.Length;
                var content = fileName + "|" + fileSizeInBytes.ToString(CultureInfo.InvariantCulture);

                return JsonConvert.SerializeObject(new ContentResult
                {
                    ContentType = file.ContentType,
                    Content = content,
                    ContentEncoding = Encoding.UTF8
                });
            }
            catch (Exception ex)
            {
                Response.StatusCode = 500;
                return JsonConvert.SerializeObject(new Dictionary<string, string> { 
                    { "message", ex.GetBaseException().Message }
                });
            }
        }

        public string UploadOpenCoverDoc(HttpPostedFileBase file, string ofrNo, long totalSizeCurrentAttachment)
        {
            try
            {
                var maxFileSize = 100;
                var totalMaxFileSize = 500;
                var fileSize = file.ContentLength;
                var fileSizeInMb = fileSize/1024.00/1024.00;
                var errMsg = "";
                var contentResponse = "";
                if (fileSizeInMb > maxFileSize)
                {
                    errMsg = "Please upload file with size not more than " + maxFileSize.ToString(CultureInfo.InvariantCulture) + " MB";
                    contentResponse = "0|" + errMsg + "|" + fileSize.ToString(CultureInfo.InvariantCulture);
                    return JsonConvert.SerializeObject(new ContentResult
                    {
                        ContentType = file.ContentType,
                        Content = contentResponse,
                        ContentEncoding = Encoding.UTF8
                    });
                }

                var totalFileSize = totalSizeCurrentAttachment + fileSize;
                var totalFileSizeInMb = Decimal.Divide(totalFileSize, 1024*1024);
                if (totalFileSizeInMb > totalMaxFileSize)
                {
                    errMsg = "Total File size cannot exceeded " + totalMaxFileSize.ToString(CultureInfo.InvariantCulture) + " MB";
                    contentResponse = "0|" + errMsg + "|" + fileSize.ToString(CultureInfo.InvariantCulture);
                    return JsonConvert.SerializeObject(new ContentResult
                    {
                        ContentType = file.ContentType,
                        Content = contentResponse,
                        ContentEncoding = Encoding.UTF8
                    });
                }
                
                var openCovDocFolder = "";
                var attachmentDirectory = "";
                if (string.IsNullOrEmpty(ofrNo))
                {
                    openCovDocFolder = "temp";
                }
                else
                {
                    openCovDocFolder = ofrNo.ToString(CultureInfo.InvariantCulture);
                }

                attachmentDirectory = Path.Combine(Server.MapPath(openCoverDocFolderMain), openCovDocFolder);

                if (!Directory.Exists(attachmentDirectory))
                    Directory.CreateDirectory(attachmentDirectory);
                
                var fileName = Path.GetFileName(file.FileName);
                var path = Path.Combine(attachmentDirectory, fileName);
                file.SaveAs(path);

                var fi = new FileInfo(path);
                var fileSizeInBytes = fi.Length;
                var content = "1|" + fileName + "|" + fileSizeInBytes.ToString(CultureInfo.InvariantCulture) + "|"+DateTime.Now;
                
                return JsonConvert.SerializeObject(new ContentResult
                {
                    ContentType = file.ContentType,
                    Content = content,
                    ContentEncoding = Encoding.UTF8
                });
            }
            catch (Exception ex)
            {
                Response.StatusCode = 500;
                return JsonConvert.SerializeObject(new Dictionary<string, string> { 
                    { "message", ex.GetBaseException().Message }
                });
            }
        }


        public FilePathResult Download(string name)
        {
            string fileName = name;
            var path = Path.Combine(Server.MapPath(openCoverDocFolderMain), "1", fileName);
            return File(path, "text/plain", fileName);
        }

        public FilePathResult DownloadJaminanAttachment(string name, long jaminanId)
        {
            string fileName = name;
            var jaminanDirectory = jaminanId.ToString(CultureInfo.InvariantCulture);
            if (jaminanId == 0)
                jaminanDirectory = "temp";
            var path = Path.Combine(Server.MapPath(openCoverDocFolderMain), jaminanDirectory, fileName);
            return File(path, "text/plain", fileName);
        }

        public FilePathResult DownloadIncidentCommentAttachment(string name, long incidentId)
        {
            string fileName = name;
            var incidentDirectory = incidentId.ToString(CultureInfo.InvariantCulture);
            var path = Path.Combine(Server.MapPath(folder), incidentDirectory, "comment", fileName);
            return File(path, "text/plain", fileName);
        }

        public FilePathResult DownloadPdf(string name)
        {
            string fileName = name;
            var path = Path.Combine(ConfigurationManager.AppSettings["REPORT_PATH"], reportFolder, pdfFolder, fileName);
            return File(path, "text/plain", fileName);
        }

        public FilePathResult DownloadXls(string name)
        {
            string fileName = name;
            var reportPath = ConfigurationManager.AppSettings["REPORT_PATH"].ToString();
            var path = Path.Combine(reportPath, reportFolder, xlsFolder, fileName);
            return File(path, "text/plain", fileName);
        }

        public FileStreamResult Stream(string name)
        {
            string fileName = name;
            var path = Path.Combine(Server.MapPath(folder), fileName);

            return File(new FileStream(path, FileMode.Open), "text/plain", fileName);
        }

        
    }
}
