using System;
using System.Net.Http;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace Core
{
    public static class HttpContentExtension
    {
        public static T GetContent<T>(this HttpResponseMessage message)
        {
            try
            {
                var contentReader = message.Content.ReadAsStringAsync();
                var content = contentReader.Result;
                var jsonResult = JObject.Parse(content);
                var data = jsonResult["data"];
                return data == null ? default(T) : (T)JsonConvert.DeserializeObject<T>(data.ToString());
            }
            catch (Exception)
            {
                return default(T);
            }
        }
    }
}
