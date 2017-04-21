using System;
using System.Collections.Generic;
using System.ComponentModel;

namespace Core.DTO.Master
{
    public class StatLineModel
    {
        public string LineCode { get; set; }
        public string LineDesc { get; set; }
        public string LineOsflag { get; set; }
        public long? LineStsGrp { get; set; }
        public string LinePrmFlag { get; set; }
        public string LineGlcode { get; set; }
        public string LineType { get; set; }
        public string LineOtrtLine { get; set; }
        public string LineGrouping { get; set; }

        public StshedModel Stshed { get; set; }
    }

    

}