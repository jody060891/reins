using System;
using System.Collections.Generic;
using System.ComponentModel;

namespace Core.DTO.Master
{
    public class CurrencyModel
    {
        public string CurrCode { get; set; }
        public decimal? CurrRate1 { get; set; }
        public decimal? CurrRate2 { get; set; }
        public decimal? CurrRate3 { get; set; }
        public decimal? CurrRate4 { get; set; }
        public decimal? CurrRate5 { get; set; }
        public decimal? CurrRate6 { get; set; }
        public decimal? CurrRevalRate { get; set; }
        public string CurrXdiffCode { get; set; }
        public decimal? CurrFactor { get; set; }
        public string CurrCont { get; set; }
        public DateTime? CurrInpDate { get; set; }
        public DateTime? CurrUpdDate { get; set; }
        public string CurrUsid { get; set; }
    }

    

}