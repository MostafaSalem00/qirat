using System.Collections.Generic;
using System.Threading.Tasks;
using Core.Entities;


namespace Core.Interfaces
{
    public interface IPlanRepository
    {
        Task<List<PlanType>> GetPlanTypeListAsync();
        // Task<Plan> CreateNewPlanAsync(Plan plan);
        Task<Plan> CreateNewPlanAsync(string buyerId, string creatorId, int planTypeId, int metalTypeId, string metalTypeName, double price, string measurementType, int amount, bool acceptTerms, string status);
        Task<OrderItem> GetOrderItemByIdAsync(int id);
        Task<OrderItem> UpdateOrderPlanAsync(OrderItem order);
        Task<Plan> CreteOrderPlanAsync(int planId, string buyerId, string creatorId, int planTypeId, int metalTypeId, string metalTypeName, double price, string measurementType, int amount, bool acceptTerms, string status);

        Task<Plan> GetSummaryPlanById(int id);
        Task<Plan> GetPlanByIdAsync(int id);
        Task<List<PlanInvitation>> GetPlanInvitationByIdAsync(int id, string inviter);

        Task<List<Plan>> GetUserPlansAsync(string userId);
    }
}