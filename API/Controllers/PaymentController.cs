using System.Threading.Tasks;
using API.Errors;
using Core.Dtos;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class PaymentController : BaseApiController
    {
        private readonly IPaymentService _paymentService;
        private readonly IUnitOfWork _unitOfWork;
        public PaymentController(IUnitOfWork unitOfWork, IPaymentService paymentService)
        {
            _unitOfWork = unitOfWork;
            _paymentService = paymentService;
        }

        [Authorize]
        [HttpPost("NewPaymentIntent")]
        public async Task<ActionResult<OrderItem>> CreateOrUpdatePaymentIntent(PlanSummaryDto plan)
        {
            var basket = await _paymentService.CreateOrUpdatePaymentIntent(plan);

            if (basket == null) return BadRequest(new ApiResponse(400, "Problem with creating intent"));

            var result = await _unitOfWork.complete();

            if (result <= 0) return BadRequest(new ApiResponse(400, "Problem with saving intent"));

            return basket;
        }
    }
}