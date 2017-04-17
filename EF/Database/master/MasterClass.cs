using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Core;

namespace EF.Database.master
{
    [Table("CLASS")]
    public class MasterClass : BaseEntityModel
    {
        [Key, StringLength(5)]
        public string ClassCode { get; set; }
        [StringLength(5)]
        public string ClassMcode { get; set; }
        [StringLength(30)]
        public string ClassName { get; set; }
        [StringLength(5)]
        public string ClassRepCode { get; set; }
        [StringLength(5)]
        public string ClassMasCode { get; set; }
        public int? ClassSortKey { get; set; }
    }
}