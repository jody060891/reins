using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Core;

namespace HITS
{
    public class ContextProvider : IContextProvider
    {
        public string GetCurrentUserId()
        {
            return HttpContext.Current.User.Identity.Name;
        }

        public bool IsAuthenticated()
        {
            return HttpContext.Current.User.Identity.IsAuthenticated;
        }
    }
}