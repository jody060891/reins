using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Core;

namespace EF.Database.master
{
    public class NL_MART_MC_LR_OCCP : BaseEntityModel
    {
        [Key, Column(Order = 0)]
        public string Occup { get; set; }
        public string OccupName { get; set; }
        public decimal? Premi { get; set; }
        public decimal? Claim { get; set; }
        [Key, Column(Order = 1)]
        public int? Mm { get; set; }
        [Key, Column(Order = 2)]
        public int? Yy { get; set; }

    }
}
