
using System;
namespace Core.DTO.Master
{
    public class OccupationModel
    {
        public string Occup { get; set; }
        public string OccupName { get; set; }
        public decimal? Premi { get; set; }
        public decimal? Claim { get; set; }
        public int? Mm { get; set; }
        public int? Yy { get; set; }
    }

    public class OccupationNewModel
    {
        public string Occup { get; set; }
        public string OccupName { get; set; }
        public decimal? Premi { get; set; }
        public decimal? Claim { get; set; }
        public int? Mm { get; set; }
        public int? Yy { get; set; }
    }

    public class OccupationByYearModel
    {
        public long occupation_id { get; set; }
        public string Occup { get; set; }
        public string OccupName { get; set; }
        public decimal? premi { get; set; }
        public decimal? premi_prev { get; set; }
        public decimal? claim { get; set; }
        public decimal? claim_prev { get; set; }
        public decimal? loss_ratio { get; set; }
        public decimal? loss_ratio_prev { get; set; }
        public decimal? tren { get; set; }
        public int mm { get; set; }
        public int yy { get; set; }
    }

    public class OccupationAllByYearGraphMorrisModel
    {
        public string yy { get; set; }
        public double p { get; set; }
        public double c { get; set; }
        public double l { get; set; }
        public double t { get; set; }
    }
}
