using System;
using System.Runtime.Serialization;

namespace Core.Entities
{
    public class InvitationInteraction : BaseEntity
    {
        public int PlanInvitationId { get; set; }

        public PlanInvitation PlanInvitation { get; set; }
        public string ActorId { get; set; }

        public DateTime ActionDate { get; set; }

        public InteractionStatus InteractionStatus { get; set; }
    }

    public enum InteractionStatus
    {
        [EnumMember(Value = "None")]
        None,

        [EnumMember(Value = "Pending")]
        Pending,

        [EnumMember(Value = "Accepted")]
        Accepted,

        [EnumMember(Value = "Closed")]
        Closed,

        [EnumMember(Value = "Banned")]
        Banned,
    }
}