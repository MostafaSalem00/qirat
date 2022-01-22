using Core.Entities;

namespace API.Dtos
{
    public class PlanForSummaryReponseDTO : BaseEntity
    {

        public int PlanTypeId { get; set; }
        public PlanType PlanType { get; set; }
        public OrderItem OrderItem { get; set; }

    }
}