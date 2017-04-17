using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Core;

namespace EF.Database.master
{
    [Table("STATUS")]
    public class MasterStatus : BaseEntityModel
    {
        [Key, StringLength(3)]
        public string StatusCode { get; set; }
        public string StatusDesc { get; set; }

    }
}