using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Core;

namespace EF.Database.master
{
    [Table("OPNCOVER")]
    public class MasterOpenCover : BaseEntityModel
    {
        [Key, StringLength(8), Column(Order = 0)]
        public string FacOpnCode { get; set; }
        [Key, Column(Order = 1)]
        public int? FacOfrNo { get; set; }

        [StringLength(2)]
        public string FacType { get; set; }
        [StringLength(2)]
        public string FacSubType { get; set; }
        [StringLength(8)]
        public string FacOldCode { get; set; }
        [StringLength(15)]
        public string FacOldRef { get; set; }

        public DateTime? FacOfrDate { get; set; }
        public DateTime? FacRepDate { get; set; }
        public DateTime? FacComDate { get; set; }
        public DateTime? FacExpDate { get; set; }
        public DateTime? FacHoldCvrDate { get; set; }
        public DateTime? FacInpDate { get; set; }
        public DateTime? FacUpdDate { get; set; }

        [StringLength(5)]
        public string FacCedant { get; set; }
        [StringLength(5)]
        public string FacBroker { get; set; }
        [StringLength(15)]
        public string FacCcRef { get; set; }
        [StringLength(15)]
        public string FacPolicyNo { get; set; }
        [StringLength(1)]
        public string FacSource { get; set; }
        [StringLength(5)]
        public string FacMainClass { get; set; }
        [StringLength(5)]
        public string FacSubClass { get; set; }
        [StringLength(5)]
        public string FacSterr { get; set; }
        [StringLength(10)]
        public string FacCurrency { get; set; }
        [StringLength(15)]
        public string FacRiPrd { get; set; }
        [StringLength(3)]
        public string FacAccSts { get; set; }
        [StringLength(1)]
        public string FacRnSts { get; set; }
        [StringLength(1)]
        public string FacRnFlag { get; set; }
        [StringLength(100)]
        public string FacInsured { get; set; }
        [StringLength(75)]
        public string FacRisk1 { get; set; }
        [StringLength(75)]
        public string FacRisk2 { get; set; }

        [StringLength(30)]
        public string FacCover1 { get; set; }
        [StringLength(30)]
        public string FacCover2 { get; set; }

        [StringLength(50)]
        public string FacDesc1 { get; set; }
        [StringLength(50)]
        public string FacDesc2 { get; set; }
        [StringLength(50)]
        public string FacDesc3 { get; set; }
        [StringLength(50)]
        public string FacDesc4 { get; set; }
        [StringLength(50)]
        public string FacDesc5 { get; set; }
        
        [StringLength(30)]
        public string FacPremRate1 { get; set; }
        [StringLength(100)]
        public string FacPremRate2 { get; set; }

        [StringLength(30)]
        public string FacCommRate1 { get; set; }
        [StringLength(30)]
        public string FacCommRate2 { get; set; }
        public decimal? FacComm { get; set; }

        [StringLength(1)]
        public string FacGnSts { get; set; }

        [StringLength(30)]
        public string FacOthDeduct1 { get; set; }
        [StringLength(30)]
        public string FacOthDeduct2 { get; set; }

        public decimal? FacWrtShr { get; set; }
        public decimal? FacSndShr { get; set; }
        public decimal? FacTotsi { get; set; }
        public decimal? FacCcsi { get; set; }
        public decimal? FacCcRetn { get; set; }
        public decimal? FacOursi { get; set; }

        public decimal? FacGpremium { get; set; }
        public decimal? FacNpremium { get; set; }
        public decimal? FacAccsi { get; set; }
        public decimal? FacDeductible { get; set; }
        public decimal? FacIndemnity { get; set; }
        public decimal? FacMinPrem { get; set; }
        public decimal? FacDepPrem { get; set; }

        [StringLength(70)]
        public string FacInfo1 { get; set; }
        [StringLength(70)]
        public string FacInfo2 { get; set; }
        [StringLength(70)]
        public string FacInfo3 { get; set; }
        [StringLength(70)]
        public string FacInfo4 { get; set; }
        [StringLength(70)]
        public string FacInfo5 { get; set; }
        [StringLength(70)]
        public string FacInfo6 { get; set; }
        [StringLength(70)]
        public string FacInfo7 { get; set; }
        [StringLength(70)]
        public string FacInfo8 { get; set; }
        [StringLength(70)]
        public string FacInfo9 { get; set; }
        [StringLength(70)]
        public string FacInfo10 { get; set; }

        public virtual MasterSubType MasterSubType { get; set; }
        public virtual MasterCompany MasterCompany { get; set; }
        public virtual MasterSterr MasterSterr { get; set; }
        public virtual MasterMainClass MasterMainClass { get; set; }
        public virtual MasterClass MasterSubClass { get; set; }
        public virtual MasterCompany MasterBroker { get; set; }
        public virtual MasterStatus MasterStatus { get; set; }
        
    }
}