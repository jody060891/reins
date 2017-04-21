using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Core;

namespace EF.Database.master
{
    [Table("STSHED")]
    public class MasterStshed : BaseEntityModel
    {
        [Key]
        public long StshedCode  { get; set; }
        [StringLength(20)]
        public string StshedDesc { get; set; }
        
    }
}