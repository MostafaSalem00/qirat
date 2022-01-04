using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.Serialization;
using System.Text.Json.Serialization;

namespace Core.Entities
{
    public class Plan : BaseEntity
    {
        public Plan()
        {
        }

        public Plan(List<OrderItem> order, string buyerId, string creatorId, int planTypeId , bool acceptTerms , PlanStatus status)
        {
            //Metal = metal;
            OrderItems = order;
            BuyerId = buyerId;  
            CreatorId = creatorId;          
            PlanTypeId = planTypeId;
            AcceptTerms = acceptTerms; 
            CreatedDate = DateTime.Now;            
            Status = status;
        }

        public List<OrderItem> OrderItems { get; set; }

        public string CreatorId { get; set; }
        public string BuyerId { get; set; }
        public int PlanTypeId { get; set; }
        public PlanType PlanType { get; set; }
        public bool AcceptTerms { get; set; }
        public DateTime CreatedDate { get; set; }        
        public PlanStatus Status { get; set; } = PlanStatus.Pending;
    }

    public enum MeasurementType
    {
        [EnumMember(Value = "None")]
        None,

        [EnumMember(Value = "Ounce")]
        Ounce,

        [EnumMember(Value = "Bar")]
        Bar
    }

    public enum OrderStatus 
    {
        [EnumMember(Value = "None")]
        None,

        [EnumMember(Value = "Pending")]
        Pending,

        [EnumMember(Value = "Payed")]
        Payed,

        [EnumMember(Value = "Closed")]
        Closed,

        [EnumMember(Value = "Banned")]
        Banned,
    }

    public enum PlanStatus 
    {
        [EnumMember(Value = "None")]
        None,

        [EnumMember(Value = "Pending")]
        Pending,

        [EnumMember(Value = "Payed")]
        Payed,

        [EnumMember(Value = "Closed")]
        Closed,

        [EnumMember(Value = "Banned")]
        Banned,
    }
}