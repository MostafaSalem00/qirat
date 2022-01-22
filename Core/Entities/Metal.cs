namespace Core.Entities
{
    public class Metal : BaseEntity
    {
        public int OrderItemId { get; set; }
        public bool success { get; set; }
        public int timestamp { get; set; }
        public string date { get; set; }
        public string @base { get; set; }
        public Rates Rates { get; set; }
        public int RatesId { get; set; }
        public string unit { get; set; }

        // public string DateTime { get; set; }
    }
}