using Core;
using Core.DTO.Sys;
using EF.Database;
using System;
using System.Net.Mail;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Net;
using MailKit;
using MailKit.Net.Imap;
using OpenPop;
using OpenPop.Mime;
using WebApiService.Master;
using WebApiService.Sys;
using MailKit.Net.Pop3;
using MailKit.Security;

namespace WebApiService.Email.EmailQueue
{
    public class EmailService : IEmailService
    {

        public EmailService()
        {
        }

        public List<EmailContentModel> ReceiveEmail()
        {
            var result = new EmailContentModel();
            var settings = GetSetting();
            var listEmail = new List<EmailContentModel>();
            using (var client = new ImapClient())
            {
                //                client.Connect(settings.host, settings.port, SecureSocketOptions.SslOnConnect);
                client.ServerCertificateValidationCallback = (s, c, h, e) => true;

                client.Connect(settings.host, settings.port, true);
                client.AuthenticationMechanisms.Remove("XOAUTH2");
                client.Authenticate(settings.from_address, settings.from_password);

                var inbox = client.Inbox;
                inbox.Open(FolderAccess.ReadOnly);
                for (int i = 0; i < inbox.Count; i++)
                {
                    var message = inbox.GetMessage(i);
                    var email = new EmailContentModel()
                    {
                        subject = message.Subject,
                        body = message.HtmlBody,
                        receiveDate = message.Date.DateTime
                    };
                    listEmail.Add(email);
                }
                listEmail = listEmail.OrderBy(e => e.receiveDate).ToList();
                result.subject = listEmail.Last().subject;
                result.body = listEmail.Last().body;
                result.receiveDate = listEmail.Last().receiveDate;
            }
            
            return listEmail;
            
        }
            
        public EmailModel GetSetting()
        {
            var setting = new EmailModel();
            setting.host = ConfigurationManager.AppSettings["SMTP_HOST"];
            //_applicationSettingService.GetSetting("SMTP_HOST");
            setting.from_address = ConfigurationManager.AppSettings["SMTP_USERNAME"];
            //_applicationSettingService.GetSetting("SMTP_USERNAME");
            setting.from_password = ConfigurationManager.AppSettings["SMTP_PASSWORD"];
            //_applicationSettingService.GetSetting("SMTP_PASSWORD");

            try
            {
                setting.port = Convert.ToInt32(ConfigurationManager.AppSettings["SMTP_PORT"]);
                //Convert.ToInt32(_applicationSettingService.GetSetting("SMTP_PORT"));
            }
            catch (Exception ex)
            {
                setting.port = 0;
            }

            return setting;
        }


    }
}
