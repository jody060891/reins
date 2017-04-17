using System;
using System.Configuration;
using System.IO;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Hosting;
using System.Web.Mvc;
using System.Web.Security;
using Core;
using NPOI.SS.Formula.Functions;
using Org.BouncyCastle.OpenSsl;
using WebApiService.Security;
using WebApiService.Sys;
using Org.BouncyCastle.Crypto;
using Org.BouncyCastle.Crypto.Parameters;
using Org.BouncyCastle.Crypto.Engines;
using Org.BouncyCastle.Crypto.Encodings;
using Org.BouncyCastle.Math;
using WebApiService.Email;


namespace HITS.Controllers.Security
{
    public class AuthenticationController : BaseController
    {
        private readonly ISecurityService _securityService;
        private readonly IUserAuditTrailService _userAuditTrailService;

        private readonly IEmailService _emailService;

        public AuthenticationController(ISecurityService securityService, IUserAuditTrailService userAuditTrailService, IEmailService emailService)
        {
            _securityService = securityService;
            _userAuditTrailService = userAuditTrailService;
            _emailService = emailService;
        }

        private string Decrypt(string str)
        {
            var bytesToDecrypt = Convert.FromBase64String(str); //GetBytes(str); // string to decrypt, base64 encoded

            AsymmetricCipherKeyPair keyPair;
            var pkFilePath = ConfigurationManager.AppSettings["RSA_PRIVATE_KEY_PATH"];
            using (var reader = System.IO.File.OpenText(pkFilePath)) // file containing RSA PKCS1 private key
                keyPair = (AsymmetricCipherKeyPair)new PemReader(reader).ReadObject();

            var decryptEngine = new Pkcs1Encoding(new RsaEngine());
            decryptEngine.Init(false, keyPair.Private);

            var decrypted = Encoding.UTF8.GetString(decryptEngine.ProcessBlock(bytesToDecrypt, 0, bytesToDecrypt.Length));


            return decrypted;
        }

        public JsonResult Login(string username, string password, bool? isElo)
        { 
            try
            {
                password = !string.IsNullOrEmpty(password)?Decrypt(password): "";
                var loginSuccess = _securityService.Login(username, password, isElo);
                var result = new BaseOperationResultModel()
                {
                    IsSuccess = loginSuccess,
                    Message = "Login Success!"
                };
                _userAuditTrailService.LogUserAction("User successfully login to PKBL", "", username);
                return JsonWithContext(result, JsonRequestBehavior.DenyGet);
            }
            catch (Exception ex)
            {
                var msg = ex.Message;
                if (ex.InnerException != null)
                    msg = ex.InnerException.Message;
                var result = new BaseOperationResultModel()
                {
                    IsSuccess = false,
                    Message = msg
                };
                _userAuditTrailService.LogUserAction("User failed login to PKBL", "", username);
                return JsonWithContext(result, JsonRequestBehavior.DenyGet);
            }
        }

        public JsonResult Logout()
        {
            _userAuditTrailService.LogUserAction("User logout from PKBL", "");
            _securityService.Logout();
            return JsonWithContext(true, JsonRequestBehavior.DenyGet);
        }

        public JsonResult IsLoggedIn(bool? isElo)
        {
            try
            {
                var loggedIn = _securityService.GetCurrentUser(isElo) != null;
                return JsonWithContext(loggedIn, JsonRequestBehavior.DenyGet);
            }
            catch
            {
                return JsonWithContext(false, JsonRequestBehavior.DenyGet);
            }
        }

        public JsonResult GetCurrentUser(bool? isELo)
        {
            try
            {
                var user = _securityService.GetCurrentUser(isELo);
                return JsonWithContext(user, JsonRequestBehavior.DenyGet);
            }
            catch(Exception ex)
            {
                return JsonWithContext(null, JsonRequestBehavior.DenyGet);
            }
        }

        public JsonResult GetCurrentUserAcl()
        {
            try
            {
                var user = _securityService.GetCurrentUserAcl();
                return JsonWithContext(user, JsonRequestBehavior.DenyGet);
            }
            catch
            {
                return JsonWithContext(null, JsonRequestBehavior.DenyGet);
            }
        }
        

        public JsonResult GetServerName()
        {
            try
            {
                string hostName = System.Net.Dns.GetHostName();
                return JsonWithContext(hostName, JsonRequestBehavior.DenyGet);
            }
            catch
            {
                return JsonWithContext(null, JsonRequestBehavior.DenyGet);
            }
        }

        public JsonResult SetAuthorizationUser(long userId)
        {
            try
            {
                FormsAuthentication.SetAuthCookie(userId.ToString(CultureInfo.InvariantCulture), false);
                return JsonWithContext(true, JsonRequestBehavior.DenyGet);
            }
            catch
            {
                return JsonWithContext(false, JsonRequestBehavior.DenyGet);

            }

        }

        public JsonResult TestConnection()
        {
            try
            {
                var a = _securityService.TestConnection();
                return JsonWithContext(a, JsonRequestBehavior.DenyGet);
            }
            catch(Exception ex)
            {
                return JsonWithContext(ex, JsonRequestBehavior.DenyGet);
            }
        }

        public JsonResult TestUWriter()
        {
            try
            {
                var a = _securityService.TestUWriter();
                return JsonWithContext(a, JsonRequestBehavior.DenyGet);
            }
            catch (Exception ex)
            {
                return JsonWithContext(ex, JsonRequestBehavior.DenyGet);
            }
        }

        public JsonResult TestMenuList()
        {
            try
            {
                var a = _securityService.TestMenuList();
                return JsonWithContext(a, JsonRequestBehavior.DenyGet);
            }
            catch (Exception ex)
            {
                return JsonWithContext(ex, JsonRequestBehavior.DenyGet);
            }
        }

        public JsonResult TestSterr()
        {
            try
            {
                var a = _securityService.TestSterr();
                return JsonWithContext(a, JsonRequestBehavior.DenyGet);
            }
            catch (Exception ex)
            {
                return JsonWithContext(ex, JsonRequestBehavior.DenyGet);
            }
        }

        public JsonResult TestStatus()
        {
            try
            {
                var a = _securityService.TestStatus();
                return JsonWithContext(a, JsonRequestBehavior.DenyGet);
            }
            catch (Exception ex)
            {
                return JsonWithContext(ex, JsonRequestBehavior.DenyGet);
            }
        }

        public JsonResult TestCurrency()
        {
            try
            {
                var a = _securityService.TestCurrency();
                return JsonWithContext(a, JsonRequestBehavior.DenyGet);
            }
            catch (Exception ex)
            {
                return JsonWithContext(ex, JsonRequestBehavior.DenyGet);
            }
        }

        public JsonResult TestCompany()
        {
            try
            {
                var a = _securityService.TestCompany();
                return JsonWithContext(a, JsonRequestBehavior.DenyGet);
            }
            catch (Exception ex)
            {
                return JsonWithContext(ex, JsonRequestBehavior.DenyGet);
            }
        }

        public JsonResult TestClass()
        {
            try
            {
                var a = _securityService.TestClass();
                return JsonWithContext(a, JsonRequestBehavior.DenyGet);
            }
            catch (Exception ex)
            {
                return JsonWithContext(ex, JsonRequestBehavior.DenyGet);
            }
        }

        public JsonResult TestTreaty()
        {
            try
            {
                var a = _securityService.TestTreaty();
                return JsonWithContext(a, JsonRequestBehavior.DenyGet);
            }
            catch (Exception ex)
            {
                return JsonWithContext(ex, JsonRequestBehavior.DenyGet);
            }
        }

        public JsonResult TestLdapLogin(string username, string password)
        {
            var result = _securityService.TestLdapLogin(username, password);
            return JsonWithContext(result, JsonRequestBehavior.DenyGet);
        }

        public JsonResult TestEmail()
        {
            try
            {
                var result = _emailService.ReceiveEmail();
                return JsonWithContext(result, JsonRequestBehavior.DenyGet);
            }
            catch (Exception ex)
            {
                return JsonWithContext(ex, JsonRequestBehavior.DenyGet);
            }
            
        }

        /*
        public JsonResult TestLogin(string username, string password)
        {
            const int institutionId = 1;

            var loginSuccess = _securityService.Login(username, password, institutionId);
            return JsonWithContext(loginSuccess, JsonRequestBehavior.AllowGet);
        }

        

        public JsonResult TestLdap(string username, string password, string searchUserName)
        {
            var result = _securityService.TestLdap(username, password, searchUserName);
            return JsonWithContext(result, JsonRequestBehavior.AllowGet);
        }
        */

    }
}