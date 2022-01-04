using System.Collections.Generic;

namespace API.Dtos
{
    public class UserPlansDto
    {
        public UserPlansDto()
        {
            InvestorList = new List<PlanInfoDto>();
            LoyaltyList = new List<PlanInfoDto>();
        }
        public List<PlanInfoDto> InvestorList { get; set; }
        public List<PlanInfoDto> LoyaltyList { get; set; }
    }
}