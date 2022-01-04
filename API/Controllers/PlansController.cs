using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dtos;
using API.Errors;
using API.Extensions;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class PlansController : BaseApiController
    {
        // private readonly IPlanRepository _repo;
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        
        private readonly UserManager<AppUser> _userManager;
        public PlansController(IUnitOfWork unitOfWork, UserManager<AppUser> userManager, IMapper mapper)
        {
            
            _unitOfWork = unitOfWork;
            _userManager = userManager;
            _mapper = mapper;
        }

        [HttpGet("PlanType")]
        public async Task<ActionResult<List<PlanType>>> GetPlanType()
        {
            return await _unitOfWork.Plans.GetPlanTypeListAsync();
        }

        [HttpPost("NewPlan")]
        public async Task<ActionResult> PostNewPlan(NewPlanDto plan)
        {
            var user = await _userManager.FindUserByClaimPrincipleAsync(HttpContext.User);
           
            var planCreated = await _unitOfWork.Plans.CreateNewPlanAsync(plan.Metals ,user.Id, user.Id ,plan.PlanTypeId, plan.MetalTypeId, plan.MetalTypeName, plan.MetalPrice, plan.MeasurementType, plan.Amount, plan.TotalPrice, plan.AcceptTerms, plan.Status);

            var result = await _unitOfWork.complete();

            if (result <= 0) return BadRequest(new ApiResponse(400, "Problem creating New Plan"));

            return Ok(planCreated);
        }

        [HttpPost("NewOrderPlan")]
        public async Task<ActionResult> PostNewOrder(NewPlanDto plan)
        {
            var user = await _userManager.FindUserByClaimPrincipleAsync(HttpContext.User);
           
            var planCreated = await _unitOfWork.Plans.CreteOrderPlanAsync(plan.Id, plan.Metals ,user.Id, user.Id ,plan.PlanTypeId, plan.MetalTypeId, plan.MetalTypeName, plan.MetalPrice, plan.MeasurementType, plan.Amount, plan.TotalPrice, plan.AcceptTerms, plan.Status);

            var result = await _unitOfWork.complete();

            if (result <= 0) return BadRequest(new ApiResponse(400, "Problem creating New Order Plan"));

            return Ok(planCreated);
        }

        //[Authorize]
        [HttpGet("PlanOrder/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        public async Task<ActionResult> GetPlanOrderById(int id)
        {
            var user = await _userManager.FindUserByClaimPrincipleAsync(HttpContext.User);

            var plan = await _unitOfWork.Plans.GetPlanByIdAsync(id);            

            if (plan == null) return BadRequest(new ApiResponse(404));

            if(user.Id != plan.BuyerId) return BadRequest(new ApiResponse(404));

           
            List<PlanInvitation> planInivitations = new List<PlanInvitation>();
            if(plan.PlanTypeId == 2)
            {
                planInivitations = await _unitOfWork.Plans.GetPlanInvitationByIdAsync(id,user.Id);
            }

            PlanOrderDto planOrder = new PlanOrderDto
            {
                Plan = plan,
                Invitations = planInivitations,
                InvitationReward = 9
            };


            return Ok(planOrder);
        }

        [HttpGet("UserPlansInfo")]
        public async Task<ActionResult> GetUserPlansInfo()
        {
            var user = await _userManager.FindUserByClaimPrincipleAsync(HttpContext.User);

            var plan = await _unitOfWork.Plans.GetUserPlansAsync(user.Id);

            var planInfo = _mapper.Map<List<PlanInfoDto>>(plan);

            var userPlans = new UserPlansDto
            {
                InvestorList = planInfo.Where(p => p.PlanTypeId == 1).ToList(),
                LoyaltyList = planInfo.Where(p => p.PlanTypeId == 2).ToList()
            };

            if (plan == null) return BadRequest(new ApiResponse(400, "Problem at fetching plans For User " + user.UserName));

            return Ok(userPlans);
        }
    }
}