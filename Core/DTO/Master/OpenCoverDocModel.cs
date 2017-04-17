using System;
using System.Collections.Generic;
using System.ComponentModel;

namespace Core.DTO.Master
{
    public class OpenCoverDocModel
    {
        public string TrtimgCode { get; set; }
        
        public string TrtimgFname { get; set; }

        public string TrtimgFile { get; set; }

        public string TrtimgDatetime { get; set; }

        public OpenCoverModel MasterOpenCover { get; set; }
    }

    

}