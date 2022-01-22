using System.Threading.Tasks;
using Core.Dtos;
using Core.Entities;

namespace Core.Interfaces
{
    public interface IPaymentService
    {
        Task<OrderItem> CreateOrUpdatePaymentIntent(PlanSummaryDto plan);
    }
}