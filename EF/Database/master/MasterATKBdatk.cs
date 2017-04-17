using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Core;

namespace EF.Database.master
{
    [Table("ATK_BDATK")]
    public class MasterAtkBdatk : BaseEntityModel
    {
        [Key, Column(Order = 0), StringLength(9)]
        public string NomAtk { get; set; }
        [StringLength(3)]
        public string KodeBag { get; set; }
        
        public DateTime? TgPemb { get; set; }
        [StringLength(1)]
        public string KdBisns { get; set; }
        [Key, Column(Order = 1)]
        public int? NoUrut { get; set; }
        [StringLength(30)]
        public string NmBrg { get; set; }
        public int? JumBrg { get; set; }
        [StringLength(10)]
        public string Satuan { get; set; }

        public virtual MasterAtkBhatk MasterAtkBhatk { get; set; }

    }
}