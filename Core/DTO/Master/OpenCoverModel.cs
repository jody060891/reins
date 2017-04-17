using System;
using System.Collections.Generic;
using System.ComponentModel;

namespace Core.DTO.Master
{
    public class OpenCoverModel
    {
        public string FacOpnCode { get; set; }

        public int? FacOfrNo { get; set; }

       
        public string FacType { get; set; }
       
        public string FacSubType { get; set; }
       
        public string FacOldCode { get; set; }
       
        public string FacOldRef { get; set; }

        public DateTime? FacOfrDate { get; set; }
        public DateTime? FacRepDate { get; set; }
        public DateTime? FacComDate { get; set; }
        public DateTime? FacExpDate { get; set; }
        public DateTime? FacHoldCvrDate { get; set; }
        public DateTime? FacInpDate { get; set; }
        public DateTime? FacUpdDate { get; set; }

       
        public string FacCedant { get; set; }
       
        public string FacBroker { get; set; }
       
        public string FacCcRef { get; set; }
       
        public string FacPolicyNo { get; set; }
        
        public string FacSource { get; set; }
       
        public string FacMainClass { get; set; }
       
        public string FacSubClass { get; set; }
       
        public string FacSterr { get; set; }
        public string FacCurrency { get; set; }
       
        public string FacRiPrd { get; set; }
        public string FacAccSts { get; set; }
        
        public string FacRnSts { get; set; }
        
        public string FacRnFlag { get; set; }
       
        public string FacInsured { get; set; }
        
        public string FacRisk1 { get; set; }
        
        public string FacRisk2 { get; set; }

        
        public string FacCover1 { get; set; }
        
        public string FacCover2 { get; set; }

        
        public string FacDesc1 { get; set; }
        
        public string FacDesc2 { get; set; }
        
        public string FacDesc3 { get; set; }
        
        public string FacDesc4 { get; set; }
        
        public string FacDesc5 { get; set; }

        
        public string FacPremRate1 { get; set; }
       
        public string FacPremRate2 { get; set; }

        
        public string FacCommRate1 { get; set; }
        
        public string FacCommRate2 { get; set; }
        public decimal? FacComm { get; set; }

        
        public string FacGnSts { get; set; }

        
        public string FacOthDeduct1 { get; set; }
        
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

       
        public string FacInfo1 { get; set; }
       
        public string FacInfo2 { get; set; }
       
        public string FacInfo3 { get; set; }
       
        public string FacInfo4 { get; set; }
       
        public string FacInfo5 { get; set; }
       
        public string FacInfo6 { get; set; }
       
        public string FacInfo7 { get; set; }
       
        public string FacInfo8 { get; set; }
       
        public string FacInfo9 { get; set; }
       
        public string FacInfo10 { get; set; }

        public SubtypeModel MasterSubType { get; set; }
        public CompanyModel MasterCompany { get; set; }
        public SterrModel MasterSterr { get; set; }
        public MainClassModel MasterMainClass { get; set; }
        public ClassModel MasterSubClass { get; set; }
        public CompanyModel MasterBroker { get; set; }
        public StatusModel MasterStatus { get; set; }

        public List<OpenCoverDocModel> MasterDocuments { get; set; }
    }

    

}