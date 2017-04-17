using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Core;

namespace EF.Database.master
{
    [Table("FSUBTYPE")]
    public class MasterSubType : BaseEntityModel
    {
        [Key]
        public string SubtypeCode { get; set; }
        public string SubtypeDesc { get; set; }
        public string SubtypeMcode{ get; set; }
        public int SubtypeSortKey { get; set; }

    }
}