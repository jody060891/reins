using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Core;

namespace EF.Database.master
{
    [Table("ATK_BAGIAN")]
    public class MasterAtkBagian : BaseEntityModel
    {
        [Key, StringLength(3)]
        public string KdBag { get; set; }
        [StringLength(60)]
        public string NmBag { get; set; }

    }
}