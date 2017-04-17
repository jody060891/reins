using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Core;

namespace EF.Database.master
{
    [Table("ATK_BHATK")]
    public class MasterAtkBhatk : BaseEntityModel
    {
        [Key, StringLength(9)]
        public string NomAtk { get; set; }
        [StringLength(3)]
        public string KodeBag { get; set; }
        [StringLength(3)]
        public string NoFpb { get; set; }
        [StringLength(6)]
        public string UrutFpb { get; set; }
        public DateTime? TgPemb { get; set; }
        [StringLength(1)]
        public string KdBisns { get; set; }
        [StringLength(8)]
        public string OpEntry { get; set; }
        [StringLength(8)]
        public string OpUpdat { get; set; }
        [StringLength(8)]
        public string OpValid { get; set; }
        public DateTime? TgEntry { get; set; }
        public DateTime? TgUpdat { get; set; }
        public DateTime? TgValid{ get; set; }
        public DateTime? TgCetak { get; set; }

        public virtual MasterAtkBagian MasterAtkBagian { get; set; }
        public virtual MasterAtkJenisBisnis MasterAtkJenisBisnis { get; set; }
        public virtual ICollection<MasterAtkBdatk> MasterAtkBdatk { get; set; } 

    }
}