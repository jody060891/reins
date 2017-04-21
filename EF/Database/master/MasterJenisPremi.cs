using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Core;

namespace EF.Database.master
{
    [Table("JENIS_PREMI")]
    public class MasterJenisPremi : BaseEntityModel
    {
        [Key, StringLength(5)]
        public string JpCode { get; set; }
        
    }
}