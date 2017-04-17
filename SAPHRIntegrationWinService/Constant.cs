using System;
using System.Collections.Generic;
using System.Configuration;

using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SAPHRIntegrationWinService
{
    public class Constant
    {
        public static string API_BASE_URL
        {
            
            get { return ConfigurationManager.AppSettings["API_BASE_URL"]; }
        }

        public static string API_METHOD_DOWNLOAD
        {
            get { return ConfigurationManager.AppSettings["API_METHOD_DOWNLOAD"]; }
        }

        public static string API_METHOD_PROCESS
        {
            get { return ConfigurationManager.AppSettings["API_METHOD_PROCESS"]; }
        }

        public static string EXECUTE_SERVICE_TIME
        {
            get { return ConfigurationManager.AppSettings["EXECUTE_SERVICE_TIME"]; }
        }

        public static string LOG_FOLDER
        {
            get { return ConfigurationManager.AppSettings["LOG_FOLDER"]; }
        }

        public static string API_HOST
        {
            get { return ConfigurationManager.AppSettings["API_HOST"]; }
        }

        public static string API_PORT
        {
            get { return ConfigurationManager.AppSettings["API_PORT"]; }
        }

        public static string API_USERNAME
        {
            get { return ConfigurationManager.AppSettings["API_USERNAME"]; }
        }

        public static string API_PASSWORD
        {
            get { return ConfigurationManager.AppSettings["API_PASSWORD"]; }
        }

        public static string API_DIRECTORY
        {
            get { return ConfigurationManager.AppSettings["API_DIRECTORY"]; }
        }

        public static string API_LOCALDIRECTORY
        {
            get { return ConfigurationManager.AppSettings["API_LOCALDIRECTORY"]; }
        }

        public static string API_PRIVATEKEYPATH
        {
            get { return ConfigurationManager.AppSettings["API_PRIVATEKEYPATH"]; }
        }

        public static string API_PRIVATEKEYPASSPHRASE
        {
            get { return ConfigurationManager.AppSettings["API_PRIVATEKEYPASSPHRASE"]; }
        }

        public static string FILE_PREFIX
        {
            get { return ConfigurationManager.AppSettings["FILE_PREFIX"]; }
        }

    }
}
