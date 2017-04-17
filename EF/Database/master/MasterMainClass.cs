using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Core;

namespace EF.Database.master
{
    [Table("MCLASS")]
    public class MasterMainClass : BaseEntityModel
    {
        [Key, StringLength(5)]
        public string MclassCode { get; set; }

        [StringLength(15)]
        public string MclassName { get; set; }

        public int? MclassSortKey { get; set; }
    }
}