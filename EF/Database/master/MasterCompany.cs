using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Core;

namespace EF.Database.master
{
    [Table("COMPANY")]
    public class MasterCompany : BaseEntityModel
    {
        [Key, StringLength(5)]
        public string CompCode { get; set; }
        [StringLength(50)]
        public string CompName { get; set; }
        [StringLength(10)]
        public string CompShrtName { get; set; }
        [StringLength(30)]
        public string CompAdrs1 { get; set; }
        [StringLength(30)]
        public string CompAdrs2 { get; set; }
        [StringLength(30)]
        public string CompAdrs3 { get; set; }
        [StringLength(30)]
        public string CompAdrs4 { get; set; }
        [StringLength(5)]
        public string CompCont{ get; set; }
        [StringLength(10)]
        public string CompDebtorGlcode { get; set; }
        [StringLength(10)]
        public string CompCredtrGlcode { get; set; }
        [StringLength(10)]
        public string CompDebGlcodeO { get; set; }
        [StringLength(10)]
        public string CompCrdGlcodeO { get; set; }
        [StringLength(10)]
        public string CompSusGlcodeI { get; set; }
        [StringLength(10)]
        public string CompSusGlcodeO { get; set; }
        [StringLength(10)]
        public string CompDebtGli { get; set; }
        [StringLength(10)]
        public string CompCretGli { get; set; }
        [StringLength(10)]
        public string CompDebtGlo { get; set; }
        [StringLength(10)]
        public string CompCretGlo { get; set; }
        [StringLength(10)]
        public string CompSustGli { get; set; }
        [StringLength(10)]
        public string CompSustGlo { get; set; }

        [StringLength(10)]
        public string CompOldDebglI { get; set; }
        [StringLength(10)]
        public string CompOldDebglO { get; set; }

        [StringLength(10)]
        public string CompOldCrdglI { get; set; }
        [StringLength(10)]
        public string CompOldCrdglO { get; set; }

        [StringLength(10)]
        public string CompOldSusglI { get; set; }
        [StringLength(10)]
        public string CompOldSusglO { get; set; }

        [StringLength(10)]
        public string CompOldDebglRi { get; set; }
        [StringLength(10)]
        public string CompOldDebglRo { get; set; }

        [StringLength(10)]
        public string CompOldCrdglRi { get; set; }
        [StringLength(10)]
        public string CompOldCrdglRo { get; set; }

        [StringLength(10)]
        public string CompOldSusglRi { get; set; }
        [StringLength(10)]
        public string CompOldSusglRo { get; set; }

        [StringLength(45)]
        public string CompNewDebDesci { get; set; }
        [StringLength(45)]
        public string CompNewCrdDesci { get; set; }

        [StringLength(45)]
        public string CompNewDebDesco { get; set; }
        [StringLength(45)]
        public string CompNewCrdDesco { get; set; }

        [StringLength(45)]
        public string CompNewSusDesci { get; set; }
        [StringLength(45)]
        public string CompNewSusDesco { get; set; }

        [StringLength(45)]
        public string CompNewDebDecri { get; set; }
        [StringLength(45)]
        public string CompNewCrdDecri { get; set; }

        [StringLength(45)]
        public string CompNewDebDecro { get; set; }
        [StringLength(45)]
        public string CompNewCrdDecro { get; set; }

        [StringLength(45)]
        public string CompNewSusDecri { get; set; }
        [StringLength(45)]
        public string CompNewSusDecro { get; set; }

        [StringLength(50)]
        public string CompRanking { get; set; }

        public virtual MasterCountry MasterCountry { get; set; }
    }
}