using System;
using System.Collections.Generic;
using System.ComponentModel;

namespace Core.DTO.Master
{
    public class StatementModel
    {
        public long StatNo { get; set; }

        
        public string StatUsid { get; set; }

        
        public string StatUsidUpd { get; set; }

        
        public string StatTrt { get; set; }

        
        public string StatCedant { get; set; }
        
        public string StatBroker { get; set; }
        
        public string StatSclass { get; set; }

        
        public string StatQtr { get; set; }

        public DateTime? StatPrdFrom { get; set; }
        public DateTime? StatPrdTo { get; set; }
        public DateTime? StatDate { get; set; }
        public DateTime? StatInpDate { get; set; }
        public DateTime? StatUpdDate { get; set; }
        public DateTime? StatPrcDate { get; set; }
        public DateTime? StatDueDate { get; set; }

        public long? StatAcyr { get; set; }
        public decimal? StatSndShr { get; set; }
        
        public string StatCurr { get; set; }
        public decimal? StatRate { get; set; }
        public decimal? StatPrc { get; set; }
        
        public string StatDesc { get; set; }
        
        public string StatLn01 { get; set; }
        public decimal? StatAmt01 { get; set; }
        
        public string StatLn02 { get; set; }
        public decimal? StatAmt02 { get; set; }
        
        public string StatLn03 { get; set; }
        public decimal? StatAmt03 { get; set; }
        
        public string StatLn04 { get; set; }
        public decimal? StatAmt04 { get; set; }
        
        public string StatLn05 { get; set; }
        public decimal? StatAmt05 { get; set; }
        
        public string StatLn06 { get; set; }
        public decimal? StatAmt06 { get; set; }
        
        public string StatLn07 { get; set; }
        public decimal? StatAmt07 { get; set; }
        
        public string StatLn08 { get; set; }
        public decimal? StatAmt08 { get; set; }
        
        public string StatLn09 { get; set; }
        public decimal? StatAmt09 { get; set; }
        
        public string StatLn10 { get; set; }
        public decimal? StatAmt10 { get; set; }
        
        public string StatLn11 { get; set; }
        public decimal? StatAmt11 { get; set; }
        
        public string StatLn12 { get; set; }
        public decimal? StatAmt12 { get; set; }
        
        public string StatLn13 { get; set; }
        public decimal? StatAmt13 { get; set; }
        
        public string StatLn14 { get; set; }
        public decimal? StatAmt14 { get; set; }

        
        public string StatRelLn01 { get; set; }
        
        public string StatRelLn01A { get; set; }
        
        public string StatRelCurr01 { get; set; }
        public long? StatRelRate01 { get; set; }
        public long? StatRelAmt01 { get; set; }

        
        public string StatRelLn02 { get; set; }
        
        public string StatRelLn02A { get; set; }
        
        public string StatRelCurr02 { get; set; }
        public long? StatRelRate02 { get; set; }
        public long? StatRelAmt02 { get; set; }

        
        public string StatRelLn03 { get; set; }
        
        public string StatRelLn03A { get; set; }
        
        public string StatRelCurr03 { get; set; }
        public long? StatRelRate03 { get; set; }
        public long? StatRelAmt03 { get; set; }

        
        public string StatRelLn04 { get; set; }
        
        public string StatRelLn04A { get; set; }
        
        public string StatRelCurr04 { get; set; }
        public long? StatRelRate04 { get; set; }
        public long? StatRelAmt04 { get; set; }

        
        public string StatRelLn05 { get; set; }
        
        public string StatRelLn05A { get; set; }
        
        public string StatRelCurr05 { get; set; }
        public long? StatRelRate05 { get; set; }
        public long? StatRelAmt05 { get; set; }

        
        public string StatOutTty1 { get; set; }
        public decimal? StatOutPrc1 { get; set; }

        
        public string StatOutTty2 { get; set; }
        public decimal? StatOutPrc2 { get; set; }

        
        public string StatOutTty3 { get; set; }
        public decimal? StatOutPrc3 { get; set; }

        
        public string StatOutTty4 { get; set; }
        public decimal? StatOutPrc4 { get; set; }

        
        public string StatOutTty5 { get; set; }
        public decimal? StatOutPrc5 { get; set; }

        public decimal? StatOsloss { get; set; }
        
        public string StatCtrlCode { get; set; }
        
        public string StatJpc { get; set; }
        
        public string StatPrsts { get; set; }
        
        public string StatRetroPrsts { get; set; }


        public TreatyModel Treaty { get; set; }
        public JenisPremiModel JenisPremi { get; set; }
        public CurrencyModel Currency { get; set; }
        public CompanyModel Cedant { get; set; }
        public CompanyModel Broker { get; set; }
        public ClassModel SubClass { get; set; }

        public StatLineModel StatLine1 { get; set; }
        public StatLineModel StatLine2 { get; set; }
        public StatLineModel StatLine3 { get; set; }
        public StatLineModel StatLine4 { get; set; }
        public StatLineModel StatLine5 { get; set; }
        public StatLineModel StatLine6 { get; set; }
        public StatLineModel StatLine7 { get; set; }
        public StatLineModel StatLine8 { get; set; }
        public StatLineModel StatLine9 { get; set; }
        public StatLineModel StatLine10 { get; set; }
        public StatLineModel StatLine11 { get; set; }
        public StatLineModel StatLine12 { get; set; }
        public StatLineModel StatLine13 { get; set; }
        public StatLineModel StatLine14 { get; set; }
    }

    

}