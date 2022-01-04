using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Core.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data.Services
{
    public class PlanRepository : IPlanRepository
    {
        private readonly StoreContext _context;
        public PlanRepository(StoreContext context)
        {
            _context = context;

        }

        public async Task<Plan> CreteOrderPlanAsync(int planId, Metal metal, string buyerId, string creatorId, int planTypeId, int metalTypeId, string metalTypeName, double price, string measurementType, int amount, double totalPrice, bool acceptTerms, string status)
        {
            MeasurementType mymeasurementType;
            Enum.TryParse(measurementType, out mymeasurementType);

            var plan = await _context.Plans.Include(p => p.OrderItems).FirstOrDefaultAsync(p => p.Id == planId);

            if (plan == null)
                return null;

            var orderItem = new OrderItem(metal, metalTypeId, metalTypeName, price, amount, totalPrice, mymeasurementType, OrderStatus.Pending);

            plan.OrderItems.Add(orderItem);

            return plan;
        }

        public async Task<Plan> GetOrderPlanById(int id)
        {
            var plan = await _context.Plans.Include(p => p.OrderItems).FirstOrDefaultAsync(p => p.Id == id);
            return plan;
        }

        public async Task<Plan> CreateNewPlanAsync(Metal metal, string buyerId, string creatorId, int planTypeId, int metalTypeId, string metalTypeName, double price, string measurementType, int amount, double totalPrice, bool acceptTerms, string status)
        {
            MeasurementType mymeasurementType;
            Enum.TryParse(measurementType, out mymeasurementType);

            var items = new List<OrderItem>();
            var orderItem = new OrderItem(metal, metalTypeId, metalTypeName, price, amount, totalPrice, mymeasurementType, OrderStatus.Pending);
            items.Add(orderItem);

            var plan = new Plan(items, buyerId, creatorId, planTypeId, acceptTerms, PlanStatus.Pending);

            await _context.Plans.AddAsync(plan);
            return plan;
        }
        public async Task<List<PlanType>> GetPlanTypeListAsync()
        {
            return await _context.PlanTypes.ToListAsync();
        }

        public async Task<List<Plan>> GetUserPlansAsync(string userId)
        {
            var plans = await _context.Plans.Where(p => p.BuyerId == userId).ToListAsync();
            return plans;
        }

        public async Task<Plan> GetPlanByIdAsync(int id)
        {
            var plan = await _context.Plans.Include(p => p.PlanType).Include(p => p.OrderItems).ThenInclude(o => o.Metal).ThenInclude(m => m.Rates).FirstOrDefaultAsync(p => p.Id == id);

            // check if users already had any plan 
            if (plan == null)
                return null;

            if (plan.PlanTypeId == 2)
                return plan;

            var orders = new List<OrderItem>(3);

            for (int i = 0; i < orders.Capacity; i++)
            {
                if (plan.OrderItems.ElementAtOrDefault(i) != null)
                {
                    orders.Add(plan.OrderItems[i]);
                }
                else
                {
                    // fetch for highest quantity order 
                    var _highestOrder = plan.OrderItems.Where((o) => o.Quantity == plan.OrderItems.Max(y => y.Quantity)).FirstOrDefault();
                    orders.Add(new OrderItem
                    {
                        MetalId = _highestOrder.MetalId,
                        Metal = _highestOrder.Metal,
                        MetalTypeId = _highestOrder.MetalTypeId,
                        MetalTypeName = _highestOrder.MetalTypeName,
                        Price = _highestOrder.Price,
                        Quantity = _highestOrder.Quantity,
                        CreatedDate = plan.CreatedDate.AddYears(i),
                        TotalPrice = _highestOrder.TotalPrice
                    });
                }
            }
            plan.OrderItems = orders;

            return plan;
        }

        public async Task<List<PlanInvitation>> GetPlanInvitationByIdAsync(int id, string inviter)
        {
            var planInvitations = await _context.PlanInvitations.Where(p => p.PlanId == id && p.Inviter == inviter).ToListAsync();
            // var invitations = new List<PlanInvitation>(9);

            // for (int i = 0; i < invitations.Capacity; i++)
            // {
            //     if(planInvitations.ElementAtOrDefault(i) != null)
            //     {
            //         invitations.Add(planInvitations[i]);
            //     }
            //     else
            //     {
            //         invitations.Add(new PlanInvitation() );
            //     }
            // }
            return planInvitations;
        }
    }
}