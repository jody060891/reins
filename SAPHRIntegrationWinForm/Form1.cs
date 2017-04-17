using System;
using System.Collections.Generic;
using System.Data;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using Autofac;
using Autofac.Core.Registration;
using Renci.SshNet;
using WebApiService.Sys;
using WebApiService.Interface;
using Core.DTO.Interface;
using System.Threading.Tasks;
using System.Timers;
using System.Threading;


namespace SAPHRIntegrationWinForm
{
    public partial class Form1 : Form
    {
        public static System.Threading.Timer _timer2;
        private static readonly ITempSapHrService _tempSapHrService;
        static System.Timers.Timer _timer = null;
        public Form1()
        {

            /*
            _timer = new System.Timers.Timer(6000);
            _timer.Enabled = true;
            _timer.Interval = 60000;
            _timer.Elapsed += new ElapsedEventHandler(TimerElapsedEventHandler);
            _timer.Start();
             * */
            
            InitializeComponent();
        }
        static void Start()
        {
            _timer2 = new System.Threading.Timer(new TimerCallback(TimerElapsedEventHandler), null, 6000 , System.Threading.Timeout.Infinite);
        }
        private void btnDownload_Click(object sender, EventArgs e)
        {
            //Download();
            Start();
            /*
            var uri = "http://localhost:5555/";
            var uriMethod = "SapHrInterface/Download";
            var client = new HttpClient { BaseAddress = new Uri(uri) };

            // Add an Accept header for JSON format.
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

            var response = client.GetAsync(uriMethod).Result;

            if (!response.IsSuccessStatusCode)
            {
                MessageBox.Show("Error Code" + response.StatusCode + " : Message - " + response.ReasonPhrase);
                //throw new Exception("Error Code" + response.StatusCode + " : Message - " + response.ReasonPhrase);
            }
            MessageBox.Show("Download Success!!");
             * */
           
            
        }

        public static void TimerElapsedEventHandler(Object state)
        {
            try
            {
                System.IO.File.WriteAllText("E:\fileSFTP\run.txt", DateTime.Now.ToString("HHmmss"));
                if (Download())
                {
                    Process();
                }
                /*
                if (DateTime.Now.ToString("HHmmss").Equals(Constant.EXECUTE_SERVICE_TIME))
                {
                    //CallWebApi(Constant.API_METHOD_DOWNLOAD).Wait();
                    //CallWebApi(Constant.API_METHOD_PROCESS).Wait();
                    
                    

                }
                 * */
            }
            catch (Exception ex)
            {
                var logPath = Constant.LOG_FOLDER + "LOG_API_CALLER_" +
                                 System.DateTime.Now.ToString("yyyyMMddhhmmss") + ".txt";
                File.WriteAllText(logPath, ex.Message);

            }
        }
        private void btnProcess_Click(object sender, EventArgs e)
        {
            /*
            var uri = "http://localhost:5555/";
            var uriMethod = "SapHrInterface/Process";
            var client = new HttpClient { BaseAddress = new Uri(uri) };

            // Add an Accept header for JSON format.
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

            var response = client.GetAsync(uriMethod).Result;

            if (!response.IsSuccessStatusCode)
            {

                MessageBox.Show("Error Code" + response.StatusCode + " : Message - " + response.ReasonPhrase);
                //throw new Exception("Error Code" + response.StatusCode + " : Message - " + response.ReasonPhrase);
            }
            MessageBox.Show("Process Success!!");
             * */
            if (Process())
            {
                MessageBox.Show("Process Success!!");
            }
        }

        public static bool Download()
        {
            String textPrint = DateTime.Now.ToString("HHmmss")+" "+Constant.EXECUTE_SERVICE_TIME;
            
            try
            {
                var host = Constant.API_HOST;
                var username = Constant.API_USERNAME;
                var password = Constant.API_PASSWORD;
                var port = Int32.Parse(Constant.API_PORT);

                var directory = Constant.API_DIRECTORY;
                var localDirectory = Constant.API_LOCALDIRECTORY;
                var privateKeyPath = Constant.API_PRIVATEKEYPATH;
                var privateKeyPassphrase = Constant.API_PRIVATEKEYPASSPHRASE;
                var privateKey = new PrivateKeyFile(privateKeyPath, privateKeyPassphrase);

                if (!Directory.Exists(localDirectory))
                    Directory.CreateDirectory(localDirectory);
                var downloaded = new List<string>();

                var connInfo = new ConnectionInfo(host, port, username, new PrivateKeyAuthenticationMethod(username, privateKey));
                using (var sftp = new SftpClient(connInfo))
                //                using (var sftp = new SftpClient(host, port, username, password))
                {

                    sftp.Connect();

                    var files = sftp.ListDirectory(directory);
                    foreach (var file in files)
                    {
                        if (file.Name == "." || file.Name == "..")
                        {
                        }
                        else
                        {
                            var localFile = Path.Combine(localDirectory, file.Name);
                            using (var fileStream = System.IO.File.Create(localFile))
                            {
                                var async = sftp.BeginDownloadFile(file.FullName, fileStream);
                                async.AsyncWaitHandle.WaitOne();
                                //sftp.DeleteFile(file.FullName);
                            }
                            downloaded.Add(file.Name);
                        }
                    }
                }

                return true;
            }
            catch (Exception ex)
            {
                var localDirectory = Constant.API_LOCALDIRECTORY;
                System.IO.File.WriteAllText(localDirectory + "error_log_download_" + DateTime.Now.ToString("yyyyMMddHHmmss") + ".txt", ex.Message);
                return false;
            }
        }

        public static bool Process()
        {
            bool result = false;
            var localDirectory = Constant.API_LOCALDIRECTORY;
            var successDirectory = Path.Combine(localDirectory, "success", DateTime.Now.ToString("yyyyMMdd"));
            if (!Directory.Exists(successDirectory))
                Directory.CreateDirectory(successDirectory);
            var failDirectory = Path.Combine(localDirectory, "fail", DateTime.Now.ToString("yyyyMMdd"));
            if (!Directory.Exists(failDirectory))
                Directory.CreateDirectory(failDirectory);

            var processed = new List<string>();

            var localDir = new DirectoryInfo(localDirectory);
            if (!localDir.GetFiles().Any())
            {
                
                result = false;
            }

            _tempSapHrService.BackUp();
            _tempSapHrService.DeleteAll();

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
                    result = false;
                    processed.Add(file.Name + ":fail-" + ex.Message);
                    file.MoveTo(Path.Combine(failDirectory, file.Name));
                    System.IO.File.WriteAllText(localDirectory + "error_log_process_" + DateTime.Now.ToString("yyyyMMdd") + ".txt", ex.Message);
                }
            }
            return result;
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

        private void button1_Click(object sender, EventArgs e)
        {
            CallWebApi("ApplicationSetting/GetSetting?key=EMAIL_INTERVAL").Wait();
            MessageBox.Show(interval);
        }

        static async Task CallWebApi(string method)
        {
            try
            {
                //new EmailQueueController().SentAllPending();
                using (var client = new HttpClient())
                {
                    var uri = "http://localhost:5555/";
                    client.BaseAddress = new Uri(uri);
                    client.DefaultRequestHeaders.Accept.Clear();
                    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                    // HTTP GET
                    var response = client.GetAsync(method).Result;
                    var x = response.Content.ReadAsAsync<Setting>();
                    var setting = x.Result.data;
                    interval = setting;
                    if (!response.IsSuccessStatusCode)
                    {
                        throw new Exception("Error Code" + response.StatusCode + " : Message - " + response.ReasonPhrase);
                    }
                    var logPath = Constant.LOG_FOLDER + "LOG_SUCCESS_" +
                                     System.DateTime.Now.ToString("yyyyMMddhhmmss") + ".txt";
                    File.WriteAllText(logPath, "Success.");
                }
            }
            catch (Exception ex)
            {
                var logPath = Constant.LOG_FOLDER + "LOG_ERROR_" +
                                 System.DateTime.Now.ToString("yyyyMMddhhmmss") + ".txt";
                File.WriteAllText(logPath, ex.Message);
            }

        }

        public class Setting
        {
            public string data { get; set; }
        }

        private static string interval = "";
    }
}
