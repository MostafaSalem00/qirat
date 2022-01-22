using Core.Entities;

namespace API.Dtos
{
    public class PlanForSummaryReponseDTO : BaseEntity
    {
        public PlanType PlanType { get; set; }
        public OrderItem OrderItem { get; set; }

    }
}