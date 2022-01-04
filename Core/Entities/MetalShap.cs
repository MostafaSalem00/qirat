using Newtonsoft.Json;

namespace Core.Entities
{
    public class MetalShap
    {
        public int USD { get; set; }

        [JsonProperty("Silver")]
        public double XAG { get; set; }

        [JsonProperty("Gold")]
        public double XAU { get; set; }

        [JsonProperty("Pladium")]
        public double XPD { get; set; }

        [JsonProperty("Platinum")]
        public double XPT { get; set; }
        
    }
}