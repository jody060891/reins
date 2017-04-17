using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;

namespace Core.DTO.Sys
{
    public class EmailModel
    {
        public string identifier { get; set; }
        public string host { get; set; }
        public string domain { get; set; }
        public int port { get; set; }
        public bool enable_ssl { get; set; }
        public SmtpDeliveryMethod delivery_method { get; set; }
        public string from_address { get; set; }
        public string from_password { get; set; }
        public int timeout { get; set; }
    }

    public class EmailContentModel
    {
        public string subject { get; set; }
        public string body { get; set; }
        public string from { get; set; }
        public DateTime receiveDate { get; set; }
    }

    public class AttachmentModel
    {
        /// <summary>
        /// Byte array data to be attached in an email via MemoryStream.
        /// </summary>
        public byte[] data { get; set; }
        public string filename { get; set; }
        public string content_type { get; set; }
    }
}
