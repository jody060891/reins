using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Core;

namespace EF.Database.master
{
    [Table("ATK_JNBIS")]
    public class MasterAtkJenisBisnis: BaseEntityModel
    {
        [Key, StringLength(2)]
        public string KdBisns { get; set; }
        [StringLength(50)]
        public string UrBisns { get; set; }
        [StringLength(6)]
        public string UrSingk{ get; set; }

    }
}