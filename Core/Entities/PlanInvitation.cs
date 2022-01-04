using System;
using System.Runtime.Serialization;

namespace Core.Entities
{
    public class PlanInvitation : BaseEntity
    {
        public string Inviter { get; set; }
        public string Invitee { get; set; }
        public string Token { get; set; }
        public string Email { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime Expiration { get; set; }
        public int PlanId { get; set; }
        public InvitationStatus Status { get; set; } 

    }

    public enum InvitationStatus 
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