using System.Web.Mvc;
using System.Web.Routing;
using HITS.Utility.Elmah.Attribute;

namespace HITS.Utility.Elmah
{
    public class ErrorHandlingControllerFactory : DefaultControllerFactory
    {
        public override IController CreateController(RequestContext requestContext, string controllerName)
        {
            var controller =
                base.CreateController(requestContext, controllerName);

            var c = controller as Controller;

            if (c != null)
            {
                c.ActionInvoker =
                    new ErrorHandlingActionInvoker(new HandleErrorWithElmahAttribute());
            }

            return controller;
        }
    }
}