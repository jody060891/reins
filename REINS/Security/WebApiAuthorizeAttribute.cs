using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebApiService.Security;

namespace HITS.Security
{
    public class WebApiAuthorizeAttribute : AuthorizeAttribute
    {
        public ISecurityService SecurityService { get; set; }
        public string AclKey { get; set; }
        
        protected override bool AuthorizeCore(HttpContextBase httpContext)
        {
            if (SecurityService.GetCurrentUser() == null) return false;
            return true;
        }

        protected override void HandleUnauthorizedRequest(AuthorizationContext filterContext)
        {
            filterContext.HttpContext.Response.StatusCode = 401;
            filterContext.HttpContext.Response.SuppressFormsAuthenticationRedirect = true;
        }
    }
}