using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Core;

namespace EF.Database.master
{
    [Table("STERR")]
    public class MasterSterr : BaseEntityModel
    {
        [StringLength(5)]
        public string SterrMterrCode { get; set; }
        [Key, StringLength(5)]
        public string SterrCode { get; set; }
        [StringLength(50)]
        public string SterrName { get; set; }

    }
}