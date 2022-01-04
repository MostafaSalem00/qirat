using System;
using Core.Entities;

namespace API.Dtos
{
    public class PlanInfoDto
    {
        public int Id { get; set; }
        public int PlanTypeId { get; set; }
        public DateTime CreatedDate { get; set; }
        public PlanStatus Status { get; set; }
        public double TotalPrice { get; set; }
    }
}