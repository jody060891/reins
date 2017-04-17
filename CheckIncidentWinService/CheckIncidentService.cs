using System;
using System.Collections.Generic;
using System.Linq;
using System.ServiceProcess;
using System.Text;
using System.Threading.Tasks;
using System.Timers;
using EF;
using EF.SP;

namespace CheckIncidentWinService
{
    public class CheckIncidentService : ServiceBase
    {
        private Timer _timer = null;
        private HITS_Database _context;

        public CheckIncidentService()
        {
            this.ServiceName = "CIS";
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
            //Download();
            ServiceBase.Run(new CheckIncidentService());
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

            this._timer = new Timer(120000);  // 30000 milliseconds = 30 seconds
            this._timer.AutoReset = true;
            this._timer.Enabled = true;
            this._timer.Elapsed += this.TimerElapsedEventHandler;

            this._timer.Start();
        }

        static void Start()
        {
        }
        protected void TimerElapsedEventHandler(object sender, System.Timers.ElapsedEventArgs e)
        {
            try
            {
                _context = new HITS_Database();
                var spWrapper = new SpWrapper(_context);
                var sp = new check_incident_institution();
                spWrapper.ExecuteNonQueryStoredProcedure(sp);
            }
            catch (Exception ex)
            {


            }
            finally
            {
                _context.Dispose();
            }
            
        }

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
    }
}
