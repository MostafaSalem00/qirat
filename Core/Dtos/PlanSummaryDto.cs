using Core.Entities;

namespace Core.Dtos
{
    public class PlanSummaryDto
    {
        public int Id { get; set; }
        public PlanType PlanType { get; set; }
        public OrderItem OrderItem { get; set; }
    }
}