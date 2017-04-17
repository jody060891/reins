using System;

namespace Core
{
    public static class LogUtility
    {
        public static string GetExceptionMessage(this Exception ex)
        {
            if (ex.InnerException != null)
            {
                return ex.InnerException.GetExceptionMessage();
            }
            else
            {
                var strErrorMsg = "";

                //strErrorMsg += Environment.NewLine + "Error in Path :" + System.Web.HttpContext.Current.Request.Path;

                //// Get the QueryString along with the Virtual Path
                //strErrorMsg += Environment.NewLine + "Raw Url :" + System.Web.HttpContext.Current.Request.RawUrl;

                // Get the error message
                //strErrorMsg += Environment.NewLine + "Message :" + ex.Message;

                strErrorMsg += ex.Message;

                //// Source of the message
                //strErrorMsg += Environment.NewLine + "Source :" + ex.Source;

                //// Stack Trace of the error

                //strErrorMsg += Environment.NewLine + "Stack Trace :" + ex.StackTrace;

                //// Method where the error occurred
                //strErrorMsg += Environment.NewLine + "TargetSite :" + ex.TargetSite;

                //strErrorMsg += Environment.NewLine + Environment.NewLine + "Exception :" + ex;

                return strErrorMsg;
            }
        }   
    }
}
