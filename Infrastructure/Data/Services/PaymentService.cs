using System.Collections.Generic;
using System.Threading.Tasks;
using Core.Dtos;
using Core.Entities;
using Core.Interfaces;
using Microsoft.Extensions.Configuration;
using Stripe;
using OrderItem = Core.Entities.OrderItem;

namespace Infrastructure.Data.Services
{
    public class PaymentService : IPaymentService
    {
        private readonly IConfiguration _config;
        private readonly IUnitOfWork _unitOfWork;
        public PaymentService(IUnitOfWork unitOfWork, IConfiguration config)
        {
            _unitOfWork = unitOfWork;
            _config = config;

        }
        public async Task<OrderItem> CreateOrUpdatePaymentIntent(PlanSummaryDto plan)
        {
            StripeConfiguration.ApiKey = _config["StripeSettings:SecretKey"];

            var orderItem = await _unitOfWork.Plans.GetOrderItemByIdAsync(plan.OrderItem.Id);
            orderItem.Price = plan.OrderItem.Price;
            orderItem.TotalPrice = plan.OrderItem.TotalPrice;

            var service = new PaymentIntentService();
            PaymentIntent intent;

            if (string.IsNullOrEmpty(orderItem.PaymentIntentId))
            {
                var options = new PaymentIntentCreateOptions
                {
                    Amount = (long)orderItem.TotalPrice,
                    Currency = "usd",
                    PaymentMethodTypes = new List<string> { "card" }
                };
                intent = await service.CreateAsync(options);
                orderItem.PaymentIntentId = intent.Id;
                orderItem.ClientSecret = intent.ClientSecret;
            }
            else
            {
                var options = new PaymentIntentUpdateOptions
                {
                    Amount = (long)orderItem.TotalPrice,
                    Currency = "usd"
                };
                await service.UpdateAsync(orderItem.PaymentIntentId, options);
            }

            await _unitOfWork.Plans.UpdateOrderPlanAsync(orderItem);

            return orderItem;
        }
    }
}