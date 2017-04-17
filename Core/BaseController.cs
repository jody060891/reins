using System;
using System.Collections.Generic;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;
using Newtonsoft.Json;

namespace Core
{
    public class BaseController : Controller
    {
        public bool CheckIfAuthenticate()
        {
            return System.Web.HttpContext.Current.User.Identity.IsAuthenticated;
        }

        public JsonResult JsonWithContext(object data, JsonRequestBehavior behavior)
        {
            return new JsonNetResult()
            {
                Data = new Dictionary<string, object>()
                    {
                        { "data", data }, 
                    },
                JsonRequestBehavior = behavior,
                MaxJsonLength = Int32.MaxValue
            };
        }


    }

    public class JsonNetResult : JsonResult
    {
        public new object Data { get; set; }

        public JsonNetResult()
        {
        }

        public override void ExecuteResult(ControllerContext context)
        {
            var response = context.HttpContext.Response;
            response.ContentType = "application/json";
            if (ContentEncoding != null)
                response.ContentEncoding = ContentEncoding;
            if (Data == null) return;
            var writer = new JsonTextWriter(response.Output) { Formatting = Formatting.Indented };
            var serializer = JsonSerializer.Create(new JsonSerializerSettings());
            serializer.Serialize(writer, Data);
            writer.Flush();
        }

    }
}