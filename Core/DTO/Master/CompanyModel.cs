using System;
using System.Collections.Generic;
using System.ComponentModel;

namespace Core.DTO.Master
{
    public class CompanyModel
    {
        public string CompCode { get; set; }
        
        public string CompName { get; set; }
        
        public string CompShrtName { get; set; }
        
        public string CompAdrs1 { get; set; }
        
        public string CompAdrs2 { get; set; }
        
        public string CompAdrs3 { get; set; }
        
        public string CompAdrs4 { get; set; }
        
        public string CompCont { get; set; }
        
        public string CompDebtorGlcode { get; set; }
        
        public string CompCredtrGlcode { get; set; }

        public string CompDebGlcodeO { get; set; }
        public string CompCrdGlcodeO { get; set; }
        public string CompSusGlcodeI { get; set; }
        public string CompSusGlcodeO { get; set; }

        public string CompDebtGli { get; set; }
        
        public string CompCretGli { get; set; }
        
        public string CompDebtGlo { get; set; }
        
        public string CompCretGlo { get; set; }
        
        public string CompSustGli { get; set; }
        
        public string CompSustGlo { get; set; }

        
        public string CompOldDebglI { get; set; }
        
        public string CompOldDebglO { get; set; }

        
        public string CompOldCrdglI { get; set; }
        
        public string CompOldCrdglO { get; set; }

        
        public string CompOldSusglI { get; set; }
        
        public string CompOldSusglO { get; set; }

        
        public string CompOldDebglRi { get; set; }
        
        public string CompOldDebglRo { get; set; }

        
        public string CompOldCrdglRi { get; set; }
        
        public string CompOldCrdglRo { get; set; }

        
        public string CompOldSusglRi { get; set; }
        
        public string CompOldSusglRo { get; set; }

        
        public string CompNewDebDesci { get; set; }
        
        public string CompNewCrdDesci { get; set; }

        
        public string CompNewDebDesco { get; set; }
        
        public string CompNewCrdDesco { get; set; }

        
        public string CompNewSusDesci { get; set; }
        
        public string CompNewSusDesco { get; set; }

        
        public string CompNewDebDecri { get; set; }
        
        public string CompNewCrdDecri { get; set; }

        
        public string CompNewDebDecro { get; set; }
        
        public string CompNewCrdDecro { get; set; }

        
        public string CompNewSusDecri { get; set; }
        
        public string CompNewSusDecro { get; set; }

        
        public string CompRanking { get; set; }

        public CountryModel MasterCountry { get; set; }
    }

    

}