using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Core;

namespace EF.Database.master
{
    [Table("CURRENCY")]
    public class MasterCurrency : BaseEntityModel
    {
        [Key]
        public string CurrCode { get; set; }
        public decimal? CurrRate1 { get; set; }
        public decimal? CurrRate2 { get; set; }
        public decimal? CurrRate3 { get; set; }
        public decimal? CurrRate4 { get; set; }
        public decimal? CurrRate5 { get; set; }
        public decimal? CurrRate6 { get; set; }
        public decimal? CurrRevalRate { get; set; }
        [StringLength(10)]
        public string CurrXdiffCode { get; set; }
        public decimal? CurrFactor { get; set; }
        [StringLength(5)]
        public string CurrCont { get; set; }
        public DateTime? CurrInpDate { get; set; }
        public DateTime? CurrUpdDate { get; set; }
        [StringLength(30)]
        public string CurrUsid { get; set; }
    }
}