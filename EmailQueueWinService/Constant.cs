using System;
using System.Collections.Generic;
using System.Configuration;

using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmailQueueWinService
{
    public class Constant
    {
        public static string API_URL
        {
            
            get { return ConfigurationManager.AppSettings["API_URL"]; }
        }

        public static string API_SETTING_URL
        {

            get { return ConfigurationManager.AppSettings["API_SETTING_URL"]; }
        }

        public static int INTERVAL
        {
            get { return Convert.ToInt32(ConfigurationManager.AppSettings["INTERVAL"]); }
        }

        public static string LOG_FOLDER
        {
            get { return ConfigurationManager.AppSettings["LOG_FOLDER"]; }
        }

        public static string INCIDENT_BATCH_JOB_TIME
        {
            get { return ConfigurationManager.AppSettings["INCIDENT_BATCH_JOB_TIME"]; }
        }

        public static string INCIDENT_BATCH_JOB_API_URL
        {
            get { return ConfigurationManager.AppSettings["INCIDENT_BATCH_JOB_API_URL"]; }
        }
    }
}
