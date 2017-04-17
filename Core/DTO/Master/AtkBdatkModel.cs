using System;
using System.Collections.Generic;
using System.ComponentModel;

namespace Core.DTO.Master
{
    public class AtkBdatkModel
    {
        public string NomAtk { get; set; }
        public string KodeBag { get; set; }

        public DateTime? TgPemb { get; set; }
        public string KdBisns { get; set; }
        public int? NoUrut { get; set; }
        public string NmBrg { get; set; }
        public int? JumBrg { get; set; }
        public string Satuan { get; set; }

        public AtkBhatkModel MasterAtkBhatk { get; set; }
    }

    

}