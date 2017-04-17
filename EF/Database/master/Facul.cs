using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Core;
using Microsoft.SqlServer.Server;

namespace EF.Database.master
{
    [Table("FACUL")]
    public class Facul : BaseEntityModel
    {
        
        //[StringLength(15)]
        public string FacUsid { get; set; }
        //[StringLength(80)]
        public string FacUsidUpd { get; set; }
        public int? FacOfrNo { get; set; }
        //[StringLength(2)]
        public string FacType { get; set; }
        //[StringLength(2)]
        public string FacSubType { get; set; }
        [Key]
        public string FacCode { get; set; }
        //[StringLength(3)]
        public string FacUwriter { get; set; }
        //[StringLength(20)]
        public string FacUwriterName { get; set; }
        //[StringLength(3)] 
        public string FacMkter { get; set; }
        //[StringLength(20)]
        public string FacMkterName { get; set; }
        //[StringLength(8)]
        public string FacOldCode { get; set; }
        //[StringLength(8)]
        public string FacCoinCode { get; set; }
        //[StringLength(8)]
        public string FacMraCode { get; set; }
        //[StringLength(8)]
        public string FacOpnCover { get; set; }
        public DateTime? FacOfrDate { get; set; }
        public DateTime? FacRepDate { get; set; }
        public DateTime? FacComDate { get; set; }
        public DateTime? FacExpDate { get; set; }
        public DateTime? FacHoldCvrDate { get; set; }
        public DateTime? FacInpDate { get; set; }
        public DateTime? FacUpdDate { get; set; }
        //[StringLength(5)]
        public string FacCedant { get; set; }
        //[StringLength(5)]
        public string FacBroker { get; set; }
        //[StringLength(6)]
        public string FacOccupation { get; set; }
        //[StringLength(15)]
        public string FacOldRef{ get; set; }
        //[StringLength(15)]
        public string FacCcRef { get; set; }
        //[StriFaculngLength(50)]
        public string FacPolicyNo{ get; set; }
        //[StringLength(1)]
        public string FacSource { get; set; }
        //[StringLength(5)]
        public string FacConstrClass{ get; set; }
        //[StringLength(5)]
        public string FacMainClass { get; set; }
        //[StringLength(5)]
        public string FacSubClass { get; set; }
        //[StringLength(5)]
        public string FacSterr{ get; set; }
        //[StringLength(10)]
        public string FacCurrency { get; set; }
        //[StringLength(15)]
        public string FacRiPrd { get; set; }
        //[StringLength(3)]
        public string FacAccSts { get; set; }
        //[StringLength(1)]
        public string FacRnSts { get; set; }
        //[StringLength(1)]
        public string FacRnFlag { get; set; }
        //[StringLength(100)]
        public string FacInsured { get; set; }
        //[StringLength(150)]
        public string FacRisk { get; set; }
        //[StringLength(60)]
        public string FacCover { get; set; }
        //[StringLength(300)]
        public string FacDesc { get; set; }
        //[StringLength(100)]
        public string FacPremRate { get; set; }
        //[StringLength(60)]
        public string FacCommRate { get; set; }

        public decimal? FacPremPer { get; set; }
        public decimal? FacComm { get; set; }
        public decimal? FacComm1 { get; set; }
        public decimal? FacComm2 { get; set; }
        public decimal? FacComm3 { get; set; }
        public decimal? FacComm4 { get; set; }
        //[StringLength(1)]
        public string FacGnSts { get; set; }
        public decimal? FacOthDeduct { get; set; }
        public decimal? FacWrtShr { get; set; }
        public decimal? FacSndShr { get; set; }
        public decimal? FacTotsi{ get; set; }
        public decimal? FacTargetSi { get; set; }
        public decimal? FacPmlPer { get; set; }
        public decimal? FacCcsi{ get; set; }
        public decimal? FacCcRetn { get; set; } 
        public decimal? FacOursi { get; set; }
        public decimal? FacGpremium { get; set; }
        public decimal? FacNpremium { get; set; }
        public decimal? FacDeductible { get; set; }
        public decimal? FacIndemnity { get; set; }
        public decimal? FacMinPrem { get; set; }
        public decimal? FacDepPrem { get; set; }
        //[StringLength(8)]
        public string FacOutTty1{ get; set; } 
        public decimal? FacOutPrc1 { get; set; } 
        public decimal? FacOutAmt1 { get; set; }
        //[StringLength(8)]
        public string FacOutTty2 { get; set; }
        public decimal? FacOutPrc2 { get; set; }
        public decimal? FacOutAmt2 { get; set; }
        //[StringLength(8)]
        public string FacOutTty3 { get; set; }
        public decimal? FacOutPrc3 { get; set; }
        public decimal? FacOutAmt3 { get; set; }
        //[StringLength(8)]
        public string FacOutTty4 { get; set; }
        public decimal? FacOutPrc4 { get; set; }
        public decimal? FacOutAmt4 { get; set; }
        //[StringLength(8)]
        public string FacOutTty5 { get; set; }
        public decimal? FacOutPrc5 { get; set; }
        public decimal? FacOutAmt5 { get; set; } 
        //[StringLength(8)]
        public string FacOutFac { get; set; }
        public decimal? FacOutFacPrc { get; set; }
        public decimal? FacOutFacAmt { get; set; }
        public decimal? FacOurPrc { get; set; }
        public decimal? FacOurAmt { get; set; } //end
        //[StringLength(8)]
        public string FacNpTrt { get; set; }
        //[StringLength(1)]
        public string FacOutPrsts { get; set; }
        //[StringLength(750)]
        public string FacInfo { get; set; }
        //[StringLength(2)]
        public string FacBis { get; set; }
        //[StringLength(1)]
        public string FacStsSlip { get; set; }
        public DateTime? FacDueDate1 { get; set; }
        public DateTime? FacDueDate2 { get; set; }
        public DateTime? FacDueDate3 { get; set; }
        public DateTime? FacDueDate4 { get; set; }
        public DateTime? FacDueDate5 { get; set; }
        public DateTime? FacDueDate6 { get; set; }
        public DateTime? FacDueDate7 { get; set; }
        public DateTime? FacDueDate8 { get; set; }
        public DateTime? FacDueDate9 { get; set; }
        public DateTime? FacDueDate10 { get; set; }
        //[StringLength(2), DefaultValue("OT")]
        public string FacVessel { get; set; }
        //[StringLength(2)]
        public string FacClassifi { get; set; }
        //[StringLength(2)]
        public string FacCHull { get; set; }
        //[StringLength(1)]
        public string FacConstr { get; set; }
        //[StringLength(2)]
        public string FacOld { get; set; }
        //[StringLength(2)]
        public string FacTonage { get; set; }
        //[StringLength(6)]
        public string FacTerritory { get; set; }
        //[StringLength(2), DefaultValue("OT")]
        public string FacCargo { get; set; }
        //[StringLength(2)]
        public string FacCCargo { get; set; }
        //[StringLength(4)]
        public string FacMjenis { get; set; }
        //[StringLength(4)]
        public string FacMkondisi { get; set; }
        //[StringLength(4)]
        public string FacMwilayah { get; set; }
        //[StringLength(4)]
        public string FacMusia { get; set; }
        //[StringLength(100)]
        public string FacSlip { get; set; }
        public decimal? FacAdjAmt { get; set; }
        //[StringLength(2)]
        public string FacAdjSts { get; set; }
        //[StringLength(11)]
        public string FacHull { get; set; }
        //[StringLength(10)]
        public string FacHeavy { get; set; }
        public int? FacRiskNo { get; set; }
        //[StringLength(5)]
        public string FacPostal { get; set; }
        //[StringLength(3)]
        public string FacAdmin { get; set; }
        //[StringLength(20)]
        public string FacAdminName { get; set; }
        //[StringLength(100)]
        public string FacCoycode { get; set; }
        public DateTime? FacDueDate11 { get; set; }
        public DateTime? FacDueDate12 { get; set; }
        //[StringLength(20)]
        public string FacUwcedingName { get; set; }
        public int? FacInsuredCode { get; set; }

        public virtual MasterUwriter MasterUwriter { get; set; }
        public virtual MasterSubType MasterSubType { get; set; }
        
    }
}
