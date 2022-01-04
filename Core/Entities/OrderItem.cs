using System;

namespace Core.Entities
{
    public class OrderItem : BaseEntity
    {
        public OrderItem()
        {
        }

        public OrderItem(Metal metal,int metalTypeId,string metalTypeName, double price, int quantity, double totalPrice, MeasurementType measurementType , OrderStatus orderStatus)
        {
            Metal = metal;
            CreatedDate = DateTime.Now;
            MetalTypeId = metalTypeId;
            MetalTypeName = metalTypeName;
            Price = price;
            Quantity = quantity;
            TotalPrice = totalPrice;
            MeasurementType = measurementType;
            OrderStatus = orderStatus;
        }

        public int MetalId { get; set; }
        public Metal Metal { get; set; }
        public DateTime CreatedDate { get; set; }
        public int MetalTypeId { get; set; }
        public string MetalTypeName { get; set; }
        public double Price { get; set; }
        public int Quantity { get; set; }
        public double TotalPrice { get; set; }        
        public MeasurementType MeasurementType { get; set; }

        public OrderStatus OrderStatus  { get; set; }
    }
}