using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Core;

namespace EF.Database.master
{
    [Table("COUNTRY")]
    public class MasterCountry : BaseEntityModel
    {
        [Key, StringLength(5)]
        public string ContCode { get; set; }
        [StringLength(10)]
        public string ContShrtName { get; set; }
        [StringLength(35)]
        public string ContName { get; set; }

    }
}