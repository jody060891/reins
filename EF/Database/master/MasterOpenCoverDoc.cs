using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Core;

namespace EF.Database.master
{
    [Table("TRTIMG")]
    public class MasterOpenCoverDoc : BaseEntityModel
    {
        [StringLength(8), Key, Column(Order = 0)]
        public string TrtimgCode { get; set; }

        [StringLength(100), Key, Column(Order = 1)]
        public string TrtimgFname { get; set; }

        [StringLength(20), Key, Column(Order = 2)]
        public string TrtimgFile { get; set; }

        [StringLength(25)]
        public string TrtimgDatetime { get; set; }
        
    }

}