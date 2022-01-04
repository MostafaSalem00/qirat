using System.Collections.Generic;
using System.Threading.Tasks;
using Core.Entities;


namespace Core.Interfaces
{
    public interface IPlanRepository
    {
        Task<List<PlanType>> GetPlanTypeListAsync();
        // Task<Plan> CreateNewPlanAsync(Plan plan);
        Task<Plan> CreateNewPlanAsync(Metal metal, string buyerId, string creatorId, int planTypeId, int metalTypeId, string metalTypeName, double price, string measurementType, int amount, double totalPrice, bool acceptTerms, string status);
        
        Task<Plan> CreteOrderPlanAsync(int planId,Metal metal, string buyerId, string creatorId, int planTypeId, int metalTypeId, string metalTypeName, double price, string measurementType, int amount, double totalPrice, bool acceptTerms, string status);
        Task<Plan> GetPlanByIdAsync(int id);
        Task<List<PlanInvitation>> GetPlanInvitationByIdAsync(int id, string inviter);

        Task<List<Plan>> GetUserPlansAsync(string userId);
    }
}