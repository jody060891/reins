using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Core;

namespace EF.Database.master
{
    [Table("UWRITER")]
    public class MasterUwriter : BaseEntityModel
    {
        [Key]
        public string UwriterCode { get; set; }
        public string UwriterName { get; set; }
        public string UwriterSts{ get; set; }

    }
}