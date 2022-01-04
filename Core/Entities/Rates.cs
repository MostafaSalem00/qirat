using System.Collections.Generic;

namespace Core.Entities
{
    public class Rates : BaseEntity
    {
        public int USD { get; set; }
        public double XAG { get; set; }
        public double XAU { get; set; }
        public double XPD { get; set; }
        public double XPT { get; set; }
        public double XRH { get; set; }

        //public List<MetalType> MetalType { get; set; }
    }
}