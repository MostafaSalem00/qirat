using System.Collections.Generic;
using Core.Entities;

namespace API.Dtos
{
    public class PlanOrderDto
    {
        public Plan Plan { get; set; }

        public List<PlanInvitation> Invitations { get; set; }

        public int InvitationReward { get; set; }
    }
}