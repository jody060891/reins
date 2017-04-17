using System;
using System.Collections.Generic;
using System.IO;
using System.Net.Http;
using System.Net.Http.Headers;
using System.ServiceProcess;
using System.Threading.Tasks;
using System.Timers;
using System.Web.Helpers;

namespace EmailQueueWinService
{
    class EmailQueueService : ServiceBase
    {
        private Timer _timer = null;
        private Timer _timerBatchJob = null;
        private static ResponseInfo responseInfo = new ResponseInfo();
        private static string email_interval = "1";
        private int timerCount = 0;
        private int emailInterval = 0;
        /// <summary>
        /// Public Constructor for WindowsService.
        /// - Put all of your Initialization code here.
        /// </summary>
        public EmailQueueService()
        {
            this.ServiceName = "HITS - Email Queue and Batch Job Service";
            this.EventLog.Log = "Application";

            // These Flags set whether or not to handle that specific
            //  type of event. Set to true if you need it, false otherwise.
            this.CanHandlePowerEvent = true;
            this.CanHandleSessionChangeEvent = true;
            this.CanPauseAndContinue = true;
            this.CanShutdown = true;
            this.CanStop = true;
        }

        /// <summary>
        /// The Main Thread: This is where your Service is Run.
        /// </summary>
        static void Main()
        {
            Run(new EmailQueueService());
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
            CallWebApiGetSetting("GetSetting?key=EMAIL_INTERVAL").Wait();
            var iInterval = 1;
            Int32.TryParse(email_interval, out iInterval);
            this._timer = new Timer(60 * 1000);
            timerCount = 0;
            emailInterval = iInterval;
            //this._timer = new Timer(iInterval * 60 * 1000);
            this._timer.AutoReset = true;
            this._timer.Enabled = true;
            this._timer.Elapsed += new ElapsedEventHandler(this.TimerElapsedEventHandler);

            this._timer.Start();

            this._timerBatchJob = new Timer(1000);
            this._timerBatchJob.AutoReset = true;
            this._timerBatchJob.Enabled = true;
            this._timerBatchJob.Elapsed += BatchJobTimerElapsedEventHandler;

            this._timerBatchJob.Start();
        }

        static void Start()
        {
        }

        protected void TimerElapsedEventHandler(object sender, ElapsedEventArgs e)
        {
            if (timerCount >= emailInterval)
            {
                CallWebApi("SentAllPending");
                timerCount = 0;
            }
            timerCount++;
        }

        protected void BatchJobTimerElapsedEventHandler(object sender, ElapsedEventArgs e)
        {
            if (!DateTime.Now.ToString("HHmmss").Equals(Constant.INCIDENT_BATCH_JOB_TIME)) return;
            CallWebApiIncidentBatchJob("ReminderToCompleteIncident");
            CallWebApiIncidentBatchJob("AutoPurgeDraftIncident");
            CallWebApiIncidentBatchJob("AutoReRouteIncident");
        }

        static async Task CallWebApi(string method)
        {
            try
            {
                //new EmailQueueController().SentAllPending();
                using (var client = new HttpClient())
                {
                    var uri = Constant.API_URL;
                    client.BaseAddress = new Uri(uri);
                    client.DefaultRequestHeaders.Accept.Clear();
                    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                    // HTTP GET
                    var response = client.GetAsync(method).Result;

                    if (!response.IsSuccessStatusCode)
                    {
                        throw new Exception("Error Code " + response.StatusCode + " : Message - " + response.ReasonPhrase);
                    }
//                    var logPath = Constant.LOG_FOLDER + "LOG_SUCCESS_EMAIL_QUEUE" +
//                                     System.DateTime.Now.ToString("yyyyMMddhhmmss") + ".txt";
//                    File.WriteAllText(logPath, "Success.");
                }
            }
            catch (Exception ex)
            {
                var logPath = Constant.LOG_FOLDER + "LOG_ERROR_EMAIL_QUEUE_" +
                                 DateTime.Now.ToString("yyyyMMddhhmmss") + ".log";
                File.WriteAllText(logPath, ex.Message);
            }

        }

        static async Task CallWebApiIncidentBatchJob(string method)
        {
            try
            {
                //new EmailQueueController().SentAllPending();
                using (var client = new HttpClient())
                {
                    var uri = Constant.INCIDENT_BATCH_JOB_API_URL;
                    client.BaseAddress = new Uri(uri);
                    client.DefaultRequestHeaders.Accept.Clear();
                    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                    // HTTP GET
                    var response = client.GetAsync(method).Result;

                    if (!response.IsSuccessStatusCode)
                    {
                        throw new Exception("Error Code " + response.StatusCode + " : Message - " + response.ReasonPhrase);
                    }
//                    var logPath = Constant.LOG_FOLDER + "LOG_SUCCESS_INCIDENT_BATCH_JOB_" +
//                                     System.DateTime.Now.ToString("yyyyMMddhhmmss") + ".txt";
//                    File.WriteAllText(logPath, "Success.");
                }
            }
            catch (Exception ex)
            {
                var logPath = Constant.LOG_FOLDER + "LOG_ERROR_INCIDENT_BATCH_JOB_" +
                                 DateTime.Now.ToString("yyyyMMddhhmmss") + ".log";
                File.WriteAllText(logPath, ex.Message);
            }

        }

        static async Task CallWebApiGetSetting(string method)
        {
            try
            {
                //new EmailQueueController().SentAllPending();
                using (var client = new HttpClient())
                {
                    var uri = Constant.API_SETTING_URL;
                    client.BaseAddress = new Uri(uri);
                    client.DefaultRequestHeaders.Accept.Clear();
                    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                    
                    // HTTP GET
                    var response = client.GetAsync(method).Result;
                    var message = response.Content.ReadAsStringAsync().Result;
                    var obj = Json.Decode(message);
                    email_interval = obj.data;
                    if (!response.IsSuccessStatusCode)
                    {
                        throw new Exception("Error Code " + response.StatusCode + " : Message - " + response.ReasonPhrase);
                    }
                    //var logPath = Constant.LOG_FOLDER + "LOG_SUCCESS_" + DateTime.Now.ToString("yyyyMMddhhmmss") + ".txt";
                    //File.WriteAllText(logPath, "Success.");
                }
            }
            catch (Exception ex)
            {
                var logPath = Constant.LOG_FOLDER + "LOG_ERROR_GET_SETTING_" +
                                 DateTime.Now.ToString("yyyyMMddhhmmss") + ".log";
                File.WriteAllText(logPath, ex.Message);
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

            if (_timerBatchJob != null)
            {
                _timerBatchJob.Stop();
                _timerBatchJob.Enabled = false;
                _timerBatchJob.Dispose();
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

    public class Rootobject
    {
        public string data { get; set; }
    }

}
