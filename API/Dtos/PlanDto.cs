using System;
using System.Collections.Generic;
using Core.Entities;

namespace API.Dtos
{
    public class PlanDto
    {
        public List<OrderItem> OrderItems { get; set; }
        public string CreatorId { get; set; }
        public string BuyerId { get; set; }
        public int PlanTypeId { get; set; }
        public PlanType PlanType { get; set; }
        public bool AcceptTerms { get; set; }
        public DateTime CreatedDate { get; set; }        
        public PlanStatus Status { get; set; } 

        public double TotalPrice { get; set; }
    }
}