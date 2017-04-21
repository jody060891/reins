using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Security.Permissions;
using Core;

namespace EF.Database.master
{
    [Table("STATEMENT")]
    public class MasterStatement : BaseEntityModel
    {
        [Key]
        public long StatNo { get; set; }

        [StringLength(15)]
        public string StatUsid { get; set; }

        [StringLength(15)]
        public string StatUsidUpd { get; set; }

        [StringLength(8)]
        public string StatTrt { get; set; }

        [StringLength(5)]
        public string StatCedant { get; set; }
        [StringLength(5)]
        public string StatBroker { get; set; }
        [StringLength(5)]
        public string StatSclass { get; set; }

        [StringLength(15)]
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
        [StringLength(10)]
        public string StatCurr { get; set; }
        public decimal? StatRate { get; set; }
        public decimal? StatPrc { get; set; }
        [StringLength(50)]
        public string StatDesc { get; set; }
        [StringLength(2)]
        public string StatLn01 { get; set; }
        public decimal? StatAmt01 { get; set; }
        [StringLength(2)]
        public string StatLn02 { get; set; }
        public decimal? StatAmt02 { get; set; }
        [StringLength(2)]
        public string StatLn03 { get; set; }
        public decimal? StatAmt03 { get; set; }
        [StringLength(2)]
        public string StatLn04 { get; set; }
        public decimal? StatAmt04 { get; set; }
        [StringLength(2)]
        public string StatLn05 { get; set; }
        public decimal? StatAmt05 { get; set; }
        [StringLength(2)]
        public string StatLn06 { get; set; }
        public decimal? StatAmt06 { get; set; }
        [StringLength(2)]
        public string StatLn07 { get; set; }
        public decimal? StatAmt07 { get; set; }
        [StringLength(2)]
        public string StatLn08 { get; set; }
        public decimal? StatAmt08 { get; set; }
        [StringLength(2)]
        public string StatLn09 { get; set; }
        public decimal? StatAmt09 { get; set; }
        [StringLength(2)]
        public string StatLn10 { get; set; }
        public decimal? StatAmt10 { get; set; }
        [StringLength(2)]
        public string StatLn11 { get; set; }
        public decimal? StatAmt11 { get; set; }
        [StringLength(2)]
        public string StatLn12 { get; set; }
        public decimal? StatAmt12 { get; set; }
        [StringLength(2)]
        public string StatLn13 { get; set; }
        public decimal? StatAmt13 { get; set; }
        [StringLength(2)]
        public string StatLn14 { get; set; }
        public decimal? StatAmt14 { get; set; }

        [StringLength(8)]
        public string StatRelLn01 { get; set; }
        [StringLength(2)]
        public string StatRelLn01A { get; set; }
        [StringLength(10)]
        public string StatRelCurr01 { get; set; }
        public long? StatRelRate01 { get; set; }
        public long? StatRelAmt01 { get; set; }

        [StringLength(8)]
        public string StatRelLn02 { get; set; }
        [StringLength(2)]
        public string StatRelLn02A { get; set; }
        [StringLength(10)]
        public string StatRelCurr02 { get; set; }
        public long? StatRelRate02 { get; set; }
        public long? StatRelAmt02 { get; set; }

        [StringLength(8)]
        public string StatRelLn03 { get; set; }
        [StringLength(2)]
        public string StatRelLn03A { get; set; }
        [StringLength(10)]
        public string StatRelCurr03 { get; set; }
        public long? StatRelRate03 { get; set; }
        public long? StatRelAmt03 { get; set; }

        [StringLength(8)]
        public string StatRelLn04 { get; set; }
        [StringLength(2)]
        public string StatRelLn04A { get; set; }
        [StringLength(10)]
        public string StatRelCurr04 { get; set; }
        public long? StatRelRate04 { get; set; }
        public long? StatRelAmt04 { get; set; }

        [StringLength(8)]
        public string StatRelLn05 { get; set; }
        [StringLength(2)]
        public string StatRelLn05A { get; set; }
        [StringLength(10)]
        public string StatRelCurr05 { get; set; }
        public long? StatRelRate05 { get; set; }
        public long? StatRelAmt05 { get; set; }

        [StringLength(8)]
        public string StatOutTty1 { get; set; }
        public decimal? StatOutPrc1 { get; set; }

        [StringLength(8)]
        public string StatOutTty2 { get; set; }
        public decimal? StatOutPrc2 { get; set; }

        [StringLength(8)]
        public string StatOutTty3 { get; set; }
        public decimal? StatOutPrc3 { get; set; }

        [StringLength(8)]
        public string StatOutTty4 { get; set; }
        public decimal? StatOutPrc4 { get; set; }

        [StringLength(8)]
        public string StatOutTty5 { get; set; }
        public decimal? StatOutPrc5 { get; set; }

        public long? StatOsloss { get; set; }
        [StringLength(1)]
        public string StatCtrlCode { get; set; }
        [StringLength(5)]
        public string StatJpc { get; set; }
        [StringLength(1)]
        public string StatPrsts { get; set; }
        [StringLength(1)]
        public string StatRetroPrsts { get; set; }
        

        public virtual MasterTreaty Treaty { get; set; }
        public virtual MasterJenisPremi JenisPremi { get; set; }
        public virtual MasterCurrency Currency { get; set; }
        public virtual MasterCompany Cedant { get; set; }
        public virtual MasterCompany Broker { get; set; }
        public virtual MasterClass SubClass { get; set; }

        public virtual MasterStatLine StatLine1 { get; set; }
        public virtual MasterStatLine StatLine2 { get; set; }
        public virtual MasterStatLine StatLine3 { get; set; }
        public virtual MasterStatLine StatLine4 { get; set; }
        public virtual MasterStatLine StatLine5 { get; set; }
        public virtual MasterStatLine StatLine6 { get; set; }
        public virtual MasterStatLine StatLine7 { get; set; }
        public virtual MasterStatLine StatLine8 { get; set; }
        public virtual MasterStatLine StatLine9 { get; set; }
        public virtual MasterStatLine StatLine10 { get; set; }
        public virtual MasterStatLine StatLine11 { get; set; }
        public virtual MasterStatLine StatLine12 { get; set; }
        public virtual MasterStatLine StatLine13 { get; set; }
        public virtual MasterStatLine StatLine14 { get; set; }

    }
}