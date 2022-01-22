using System.Text.Json.Serialization;
using API.Converters;
using Core.Entities;

namespace API.Dtos
{
    public class NewPlanDto
    {
        [JsonConverter(typeof(IntToStringConverter))]
        public int Id { get; set; }

        [JsonConverter(typeof(IntToStringConverter))]
        public int PlanTypeId { get; set; }

        [JsonConverter(typeof(IntToStringConverter))]
        public int MetalTypeId { get; set; }

        public string MetalTypeName { get; set; }

        // public double MetalPrice { get; set; }

        public string MeasurementType { get; set; }

        public int Amount { get; set; }

        public bool AcceptTerms { get; set; }

        public string Status { get; set; }

        // public double TotalPrice { get; set; }        

        // public Metal Metals { get; set; }
    }
}