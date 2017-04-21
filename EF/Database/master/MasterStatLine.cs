using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Core;

namespace EF.Database.master
{
    [Table("STATLINE")]
    public class MasterStatLine : BaseEntityModel
    {
        [Key, StringLength(2)]
        public string LineCode { get; set; }
        [StringLength(26)]
        public string LineDesc { get; set; }
        [StringLength(2)]
        public string LineOsflag { get; set; }
        public long? LineStsGrp { get; set; }
        [StringLength(2)]
        public string LinePrmFlag { get; set; }
        [StringLength(11)]
        public string LineGlcode { get; set; }
        [StringLength(2)]
        public string LineType { get; set; }
        [StringLength(3)]
        public string LineOtrtLine { get; set; }
        [StringLength(2)]
        public string LineGrouping { get; set; }

        public virtual MasterStshed Stshed { get; set; }
    }
}