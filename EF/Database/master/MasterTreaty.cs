using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Core;

namespace EF.Database.master
{
    [Table("PRTREATY")]
    public class MasterTreaty : BaseEntityModel
    {
        [Key, StringLength(8)]
        public string TrtCode { get; set; }
        [StringLength(15)]
        public string TrtUsid { get; set; }
        [StringLength(15)]
        public string TrtUsidUpd { get; set; }
        [StringLength(3)]
        public string TrtUwriter { get; set; }
        [StringLength(3)]
        public string TrtMkter { get; set; }
        [StringLength(8)]
        public string TrtBouquet { get; set; }
        [StringLength(8)]
        public string TrtLinkCode { get; set; }
        [StringLength(15)]
        public string TrtHeadRef { get; set; }
        [StringLength(15)]
        public string TrtShrtName { get; set; }
        [StringLength(40)]
        public string TrtName { get; set; }
        public DateTime? TrtOfrDate { get; set; }
        public DateTime? TrtUpdDate { get; set; }
        public DateTime? TrtInpDate { get; set; }
        [StringLength(1)]
        public string TrtRnSts { get; set; }
        [StringLength(1)]
        public string TrtRcSts { get; set; }
        [StringLength(1)]
        public string TrtSource { get; set; }
        [StringLength(2)]
        public string TrtType { get; set; }
        [StringLength(2)]
        public string TrtSubType { get; set; }

        [StringLength(5)]
        public string TrtClass { get; set; }
        public decimal? TrtPrc1 { get; set; }

        [StringLength(5)]
        public string TrtClass2 { get; set; }
        public decimal? TrtPrc2 { get; set; }

        [StringLength(5)]
        public string TrtClass3 { get; set; }
        public decimal? TrtPrc3 { get; set; }

        [StringLength(5)]
        public string TrtClass4 { get; set; }
        public decimal? TrtPrc4 { get; set; }

        [StringLength(5)]
        public string TrtClass5 { get; set; }
        public decimal? TrtPrc5 { get; set; }

        [StringLength(10)]
        public string TrtCurrency { get; set; }
        [StringLength(5)]
        public string TrtCedant { get; set; }
        [StringLength(5)]
        public string TrtBroker { get; set; }
        [StringLength(15)]
        public string TrtRefno { get; set; }

        [StringLength(5)]
        public string TrtSterr{ get; set; }
        public decimal? TrtSterrPrc1 { get; set; }

        [StringLength(5)]
        public string TrtSterr2 { get; set; }
        public decimal? TrtSterrPrc2 { get; set; }

        [StringLength(5)]
        public string TrtSterr3 { get; set; }
        public decimal? TrtSterrPrc3 { get; set; }

        [StringLength(5)]
        public string TrtSterr4 { get; set; }
        public decimal? TrtSterrPrc4 { get; set; }

        [StringLength(5)]
        public string TrtSterr5 { get; set; }
        public decimal? TrtSterrPrc5 { get; set; }

        public DateTime? TrtCommDate { get; set; }
        public DateTime? TrtExpDate { get; set; }

        public int? TrtNotice { get; set; }
        public int? TrtPartYr { get; set; }
        public decimal? TrtWrtShr { get; set; }
        public decimal? TrtSndShr { get; set; }
        public decimal? TrtRetShr { get; set; }

        [StringLength(1)]
        public string TrtWrdsSts { get; set; }
        [StringLength(1)]
        public string TrtSlpSts { get; set; }
        [StringLength(1)]
        public string TrtPncrSts { get; set; }
        [StringLength(1)]
        public string TrtPnrcSts { get; set; }
        [StringLength(1)]
        public string TrtDncrSts { get; set; }
        [StringLength(1)]
        public string TrtDnrcSts { get; set; }
        [StringLength(3)]
        public string TrtAccSts { get; set; }
        [StringLength(40)]
        public string TrtRemarks { get; set; }

        [StringLength(8)]
        public string TrtOutTty1 { get; set; }
        public decimal? TrtOutPrc1 { get; set; }
        [StringLength(8)]
        public string TrtOutTty2 { get; set; }
        public decimal? TrtOutPrc2 { get; set; }
        [StringLength(8)]
        public string TrtOutTty3 { get; set; }
        public decimal? TrtOutPrc3 { get; set; }
        [StringLength(8)]
        public string TrtOutTty4 { get; set; }
        public decimal? TrtOutPrc4 { get; set; }
        [StringLength(8)]
        public string TrtOutTty5 { get; set; }
        public decimal? TrtOutPrc5 { get; set; }
        public decimal? TrtOurPrc { get; set; }

        [StringLength(8)]
        public string TrtNpTty1 { get; set; }
        [StringLength(8)]
        public string TrtNpTty2 { get; set; }
        [StringLength(8)]
        public string TrtNpTty3 { get; set; }
        [StringLength(8)]
        public string TrtNpTty4 { get; set; }

        [StringLength(10)]
        public string TrtCurr1 { get; set; }
        public decimal? TrtOsloss1 { get; set; }
        [StringLength(10)]
        public string TrtCurr2 { get; set; }
        public decimal? TrtOsloss2 { get; set; }
        [StringLength(10)]
        public string TrtCurr3 { get; set; }
        public decimal? TrtOsloss3 { get; set; }
        [StringLength(10)]
        public string TrtCurr4 { get; set; }
        public decimal? TrtOsloss4 { get; set; }
        [StringLength(10)]
        public string TrtCurr5 { get; set; }
        public decimal? TrtOsloss5 { get; set; }

        public decimal? TrtData01 { get; set; }
        public decimal? TrtData02 { get; set; }
        public decimal? TrtData03 { get; set; }
        public decimal? TrtData04 { get; set; }
        public decimal? TrtData05 { get; set; }

        [StringLength(20)]
        public string TrtData06 { get; set; }
        [StringLength(20)]
        public string TrtData07 { get; set; }
        [StringLength(20)]
        public string TrtData08 { get; set; }
        [StringLength(20)]
        public string TrtData09 { get; set; }
        [StringLength(20)]
        public string TrtData10 { get; set; }
        [StringLength(20)]
        public string TrtData11 { get; set; }
        [StringLength(20)]
        public string TrtData12 { get; set; }
        [StringLength(20)]
        public string TrtData13 { get; set; }
        [StringLength(20)]
        public string TrtData14 { get; set; }

        public decimal? TrtData15 { get; set; }
        public decimal? TrtData16 { get; set; }
        public decimal? TrtData17 { get; set; }
        public decimal? TrtData18 { get; set; }
        public decimal? TrtData19 { get; set; }
        public decimal? TrtData20 { get; set; }
        public decimal? TrtData21 { get; set; }
        public decimal? TrtData22 { get; set; }

        [StringLength(20)]
        public string TrtData24 { get; set; }
        [StringLength(20)]
        public string TrtData25 { get; set; }
        [StringLength(20)]
        public string TrtData26 { get; set; }
        [StringLength(15)]
        public string TrtData27 { get; set; }

        public decimal? TrtData28 { get; set; }
        public decimal? TrtData29 { get; set; }

        public DateTime? TrtDate1 { get; set; }
        public DateTime? TrtDate2 { get; set; }
        public DateTime? TrtDate3 { get; set; }
        public DateTime? TrtDate4 { get; set; }

        public int? TrtRefSla01 { get; set; }
        [StringLength(1)]
        public string TrtStlSts01 { get; set; }
        public int? TrtRefSla02 { get; set; }
        [StringLength(1)]
        public string TrtStlSts02 { get; set; }
        public int? TrtRefSla03 { get; set; }
        [StringLength(1)]
        public string TrtStlSts03 { get; set; }
        public int? TrtRefSla04 { get; set; }
        [StringLength(1)]
        public string TrtStlSts04 { get; set; }
        public int? TrtRefSla05 { get; set; }
        [StringLength(1)]
        public string TrtStlSts05 { get; set; }
        public int? TrtRefSla06 { get; set; }
        [StringLength(1)]
        public string TrtStlSts06 { get; set; }
        public int? TrtRefSla07 { get; set; }
        [StringLength(1)]
        public string TrtStlSts07 { get; set; }
        public int? TrtRefSla08 { get; set; }
        [StringLength(1)]
        public string TrtStlSts08 { get; set; }
        public int? TrtRefSla09 { get; set; }
        [StringLength(1)]
        public string TrtStlSts09 { get; set; }
        public int? TrtRefSla10 { get; set; }
        [StringLength(1)]
        public string TrtStlSts10 { get; set; }
        public int? TrtRefSla11 { get; set; }
        [StringLength(1)]
        public string TrtStlSts11 { get; set; }
        public int? TrtRefSla12 { get; set; }
        [StringLength(1)]
        public string TrtStlSts12 { get; set; }
        public int? TrtRefSla13 { get; set; }
        [StringLength(1)]
        public string TrtStlSts13 { get; set; }
        public int? TrtRefSla14 { get; set; }
        [StringLength(1)]
        public string TrtStlSts14 { get; set; }
        public int? TrtRefSla15 { get; set; }
        [StringLength(1)]
        public string TrtStlSts15 { get; set; }

        [StringLength(700)]
        public string TrtInfo { get; set; }
        [StringLength(50)]
        public string TrtLeader { get; set; }

        public decimal? TrtLmtRsmd { get; set; }
        public decimal? TrtLmtEq { get; set; }
        public decimal? TrtLmtFlood { get; set; }
//        public decimal? TrtData23 { get; set; }
//        public decimal? TrtData08Pr { get; set; }
//        public decimal? TrtData14Pr { get; set; }
//        public decimal? TrtData06Pr { get; set; }
//        public decimal? TrtData10Pr { get; set; }
//        public decimal? TrtData11Pr { get; set; }
//        public decimal? TrtData12_Pr { get; set; }


        public virtual MasterSubType MasterSubType { get; set; }
        public virtual MasterSterr MasterSterr { get; set; }
        public virtual MasterStatus MasterStatus { get; set; }
        public virtual MasterCurrency MasterCurrency { get; set; }
        public virtual MasterCompany MasterCompany { get; set; }
        public virtual MasterClass MasterClass { get; set; }

        
    }
}