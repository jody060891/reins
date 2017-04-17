using System;
using System.Collections.Generic;
using System.IO;
using System.Net.Http;
using System.Net.Http.Headers;
using System.ServiceProcess;
using System.Threading.Tasks;
using System.Timers;
using Renci.SshNet;
using System.Linq;
using System.Web;
using Core.DTO.Interface;
using WebApiService.Interface;
using log4net;
using log4net.Config;

[assembly: log4net.Config.XmlConfigurator(Watch = true)]
namespace SAPHRIntegrationWinService
{
    class SapHrIntegrationService : ServiceBase
    {
        private readonly ITempSapHrService _tempSapHrService;
        private  Timer _timer = null;
        private static ResponseInfo responseInfo = new ResponseInfo();
        private static readonly ILog log = LogManager.GetLogger(typeof(SapHrIntegrationService));
        
        /// <summary>
        /// Public Constructor for WindowsService.
        /// - Put all of your Initialization code here.
        /// </summary>
        public SapHrIntegrationService()
        {

            this.ServiceName = "HITS - SAP-HR Integration Service";
            this.EventLog.Log = "Application";
            
            // These Flags set whether or not to handle that specific
            //  type of event. Set to true if you need it, false otherwise.
            this.CanHandlePowerEvent = true;
            this.CanHandleSessionChangeEvent = true;
            this.CanPauseAndContinue = true;
            this.CanShutdown = true;
            this.CanStop = true;
            BasicConfigurator.Configure();
        }

        /// <summary>
        /// The Main Thread: This is where your Service is Run.
        /// </summary>
        static void Main()
        {
            //Download();
            ServiceBase.Run(new SapHrIntegrationService());
        }

        /// <summary>
        /// Dispose of objects that need it here.
        /// </summary>
        /// <param name="disposing">Whether
        ///    or not disposing is going on.</param>
        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);
        }

        /// <summary>
        /// OnStart(): Put startup code here
        ///  - Start threads, get inital data, etc.
        /// </summary>
        /// <param name="args"></param>
        protected override void OnStart(string[] args)
        {
            
            this._timer = new System.Timers.Timer(1000);  // 30000 milliseconds = 30 seconds
            this._timer.AutoReset = true;
            this._timer.Enabled = true;
            this._timer.Elapsed += new System.Timers.ElapsedEventHandler(this.TimerElapsedEventHandler);

            this._timer.Start();
        }
        static void Start()
        {
        }
        protected  void TimerElapsedEventHandler(object sender, System.Timers.ElapsedEventArgs e)
        {
            try
            {
                if(DateTime.Now.ToString("HHmmss").Equals(Constant.EXECUTE_SERVICE_TIME))
                {
                    if (Download())
                    {
                        //Process();
                        CallWebApi(Constant.API_METHOD_PROCESS);
                    }
                }
                
            }
            catch (Exception ex)
            {
                var logPath = Constant.LOG_FOLDER + "error_log_timer_" +
                                 System.DateTime.Now.ToString("yyyyMMddhhmmss") + ".log";
                File.WriteAllText(logPath, ex.Message);
                //var localDirectory = Constant.API_LOCALDIRECTORY;
                //System.IO.File.WriteAllText(localDirectory + "error_log_timer_" + DateTime.Now.ToString("yyyyMMddHHmmss") + ".txt", ex.Message);
                

            }
            //SapHrIntegrationService.Main();
        }

        
        public static bool Download()
        {  
            try
            {
                var logPath = Constant.LOG_FOLDER + "error_log_download_" +
                                 System.DateTime.Now.ToString("yyyyMMddhhmmss") + ".log";
                var host = Constant.API_HOST;
                var username = Constant.API_USERNAME;
                var password = Constant.API_PASSWORD;
                var port = Int32.Parse(Constant.API_PORT);
                log.Info("Connecting to SFTP: " + host + "@" + username + " port " + port);
                
                var directory = Constant.API_DIRECTORY;
                var localDirectory = Constant.API_LOCALDIRECTORY;
                var privateKeyPath = Constant.API_PRIVATEKEYPATH;
                var privateKeyPassphrase = Constant.API_PRIVATEKEYPASSPHRASE;
                var privateKey = new PrivateKeyFile(privateKeyPath, privateKeyPassphrase);
                var filePrefix = Constant.FILE_PREFIX;
                var filePrefixLength = filePrefix.Length;
                if (!Directory.Exists(localDirectory))
                    Directory.CreateDirectory(localDirectory);
                var downloaded = new List<string>();

                var connInfo = new ConnectionInfo(host, port, username, new PrivateKeyAuthenticationMethod(username, privateKey));
                using (var sftp = new SftpClient(connInfo))
                {
                    try
                    {
                        sftp.Connect();
                    }
                    catch (Exception ex)
                    {
                        log.Error("Error Connecting to SFTP");
                        System.IO.File.WriteAllText(Constant.LOG_FOLDER + "error_log_download_" + DateTime.Now.ToString("yyyyMMddHHmmss") + ".log", ex.Message);
                        return false;
                    }
                    log.Info("SFTP connection success");
                    var files = sftp.ListDirectory(directory);
                    foreach (var file in files)
                    {
                        if (file.Name == "." || file.Name == "..")
                        {
                        }
                        else if (file.Name.Substring(0, filePrefixLength).Equals(filePrefix))
                        {
                            var localFile = Path.Combine(localDirectory, file.Name);
                            using (var fileStream = System.IO.File.Create(localFile))
                            {
                                log.Info("Downloading File...");
                                var async = sftp.BeginDownloadFile(file.FullName, fileStream);
                                async.AsyncWaitHandle.WaitOne();
                                log.Info("Download File Success.");
                                log.Info("Deleting File in SFTP...");
                                sftp.DeleteFile(file.FullName);
                                log.Info("Delete File Success.");
                            }
                            downloaded.Add(file.Name);
                        }
                    }
                }
                responseInfo.IsSuccess = true;
                responseInfo.ErrorMessage = "";
                responseInfo.Data = downloaded;
                return true;
            }
            catch (Exception ex)
            {
                log.Error("Error Downloading File", ex);
                responseInfo.IsSuccess = false;
                responseInfo.ErrorMessage = ex.Message;
                System.IO.File.WriteAllText(Constant.LOG_FOLDER + "error_log_download_" + DateTime.Now.ToString("yyyyMMddHHmmss") + ".log", ex.Message);
                return false;
            }

        }

        public bool Process()
        {
            bool result = false;
            var localDirectory = Constant.API_LOCALDIRECTORY;
            var successDirectory = Path.Combine(localDirectory, "success", DateTime.Now.ToString("yyyyMMdd"));
            if (!Directory.Exists(successDirectory))
                Directory.CreateDirectory(successDirectory);
            var failDirectory = Path.Combine(localDirectory, "fail", DateTime.Now.ToString("yyyyMMdd"));
            if (!Directory.Exists(failDirectory))
                Directory.CreateDirectory(failDirectory);

            var responseInfo = new ResponseInfo();
            var processed = new List<string>();

            var localDir = new DirectoryInfo(localDirectory);
            if (!localDir.GetFiles().Any())
            {
                responseInfo.IsSuccess = true;
                responseInfo.ErrorMessage = "No files!";
                result =  false;
            }

            _tempSapHrService.BackUp();
            _tempSapHrService.DeleteAll();

            responseInfo.IsSuccess = true;
            foreach (var file in localDir.GetFiles())
            {
                try
                {
                    var lines = System.IO.File.ReadAllLines(file.FullName);
                    var isFirst = true;
                    foreach (var line in lines)
                    {
                        if (isFirst) // row header
                        {
                            isFirst = false;
                            continue;
                        }
                        var lineParts = line.Split(new[] { '|' });
                        var temp = new TempSapHrModel
                        {
                            sap_hr_id = 0,
                            employee_id = lineParts[0],
                            employee_name = lineParts[1],
                            gender = lineParts[2],
                            institution = lineParts[3],
                            department = lineParts[4],
                            designation = lineParts[5],
                            email_address = lineParts[6],
                            adid = lineParts[7],
                            date_join = ToDateTime(lineParts[8]),
                            date_resign = ToDateTime(lineParts[9]),
                            employee_category = lineParts[10],
                            mcr_no = lineParts[11]
                        };
                        _tempSapHrService.Save(temp);
                    }
                    processed.Add(file.Name + ":success");
                    file.MoveTo(Path.Combine(successDirectory, file.Name));
                    result = true;
                }
                catch (Exception ex)
                {
                    responseInfo.IsSuccess = false;
                    result = false;
                    processed.Add(file.Name + ":fail-" + ex.Message);
                    file.MoveTo(Path.Combine(failDirectory, file.Name));
                    System.IO.File.WriteAllText(localDirectory + "error_log_process_" + DateTime.Now.ToString("yyyyMMddHHmmss")+".log", ex.Message);
                }
            }
            responseInfo.Data = processed;
            return result;
            //return JsonWithContext(processed, JsonRequestBehavior.AllowGet);
            
        }
        
        static async Task CallWebApi(string method)
        {
            try
            {
                using (var client = new HttpClient())
                {
                    var uri = Constant.API_BASE_URL;
                    client.BaseAddress = new Uri(uri);
                    client.DefaultRequestHeaders.Accept.Clear();
                    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                    client.Timeout = new TimeSpan(0, 1, 0, 0);
                    // HTTP GET
                    var response = await client.GetAsync(method);
                    if (!response.IsSuccessStatusCode)
                    {
                        throw new Exception("Error Code " + response.StatusCode + " : Message - " +
                                            response.ReasonPhrase);
                    }
                }
            }
            catch (AggregateException ex)
            {
                var logPath = Constant.LOG_FOLDER + "error_log_process_" +
                              System.DateTime.Now.ToString("yyyyMMddhhmmss") + ".log";
                File.WriteAllText(logPath, ex.Flatten().Message);
            }
            catch (Exception ex)
            {
                var logPath = Constant.LOG_FOLDER + "error_log_process_" +
                     System.DateTime.Now.ToString("yyyyMMddhhmmss") + ".log";
                File.WriteAllText(logPath, ex.Message);
            }

        }

        public static DateTime ToDateTime(string dt)
        {
            try
            {
                var dtfi = new System.Globalization.DateTimeFormatInfo { ShortDatePattern = "dd/MM/yyyy" };

                return DateTime.Parse(dt, dtfi);

            }
            catch (Exception)
            {
                return new DateTime(1900, 1, 1);
            }
        }

        /// <summary>
        /// OnStop(): Put your stop code here
        /// - Stop threads, set final data, etc.
        /// </summary>
        protected override void OnStop()
        {
            if (_timer != null)
            {
                _timer.Stop();
                _timer.Enabled = false;
                _timer.Dispose();
            }
            base.OnStop();
        }

        /// <summary>
        /// OnPause: Put your pause code here
        /// - Pause working threads, etc.
        /// </summary>
        protected override void OnPause()
        {
            base.OnPause();
        }

        /// <summary>
        /// OnContinue(): Put your continue code here
        /// - Un-pause working threads, etc.
        /// </summary>
        protected override void OnContinue()
        {
            base.OnContinue();
        }

        /// <summary>
        /// OnShutdown(): Called when the System is shutting down
        /// - Put code here when you need special handling
        ///   of code that deals with a system shutdown, such
        ///   as saving special data before shutdown.
        /// </summary>
        protected override void OnShutdown()
        {
            base.OnShutdown();
        }

        /// <summary>
        /// OnCustomCommand(): If you need to send a command to your
        ///   service without the need for Remoting or Sockets, use
        ///   this method to do custom methods.
        /// </summary>
        /// <param name="command">Arbitrary Integer between 128 & 256</param>
        protected override void OnCustomCommand(int command)
        {
            //  A custom command can be sent to a service by using this method:
            //#  int command = 128; //Some Arbitrary number between 128 & 256
            //#  ServiceController sc = new ServiceController("NameOfService");
            //#  sc.ExecuteCommand(command);

            base.OnCustomCommand(command);
        }

        /// <summary>
        /// OnPowerEvent(): Useful for detecting power status changes,
        ///   such as going into Suspend mode or Low Battery for laptops.
        /// </summary>
        /// <param name="powerStatus">The Power Broadcast Status
        /// (BatteryLow, Suspend, etc.)</param>
        protected override bool OnPowerEvent(PowerBroadcastStatus powerStatus)
        {
            return base.OnPowerEvent(powerStatus);
        }

        /// <summary>
        /// OnSessionChange(): To handle a change event
        ///   from a Terminal Server session.
        ///   Useful if you need to determine
        ///   when a user logs in remotely or logs off,
        ///   or when someone logs into the console.
        /// </summary>
        /// <param name="changeDescription">The Session Change
        /// Event that occured.</param>
        protected override void OnSessionChange(SessionChangeDescription changeDescription)
        {
            base.OnSessionChange(changeDescription);
        }
    }
    class ResponseInfo
    {
        public bool IsSuccess { get; set; }
        public string ErrorMessage { get; set; }
        public List<string> Data { get; set; }
    }
}
