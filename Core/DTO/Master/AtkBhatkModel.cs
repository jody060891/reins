using System;
using System.Collections.Generic;
using System.ComponentModel;

namespace Core.DTO.Master
{
    public class AtkBhatkModel
    {
        public string NomAtk { get; set; }
        public string KodeBag { get; set; }
        public string NoFpb { get; set; }
        public string UrutFpb { get; set; }
        public DateTime? TgPemb { get; set; }
        public string KdBisns { get; set; }
        public string OpEntry { get; set; }
        public string OpUpdat { get; set; }
        public string OpValid { get; set; }
        public DateTime? TgEntry { get; set; }
        public DateTime? TgUpdat { get; set; }
        public DateTime? TgValid { get; set; }
        public DateTime? TgCetak { get; set; }

        public AtkBagianModel MasterAtkBagian { get; set; }
        public AtkJenisBisnisModel MasterAtkJenisBisnis { get; set; }
        public List<AtkBdatkModel> MasterAtkBdatk { get; set; }
    }

    

}