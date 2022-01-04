using System;
using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Infrastructure.Data.Config
{
    public class PlanConfiguration : IEntityTypeConfiguration<Plan>
    {
        public void Configure(EntityTypeBuilder<Plan> builder)
        {
            
            builder
                .Property(e => e.Status)
                .HasConversion<int>();

            // builder
            //     .Property(e => e.MeasurementType)
            //     .HasConversion<int>();
                // .HasConversion(
                //     p => p.ToString(),
                //     p => (PlanStatus)Enum.Parse(typeof(PlanStatus), p));
            // builder
            //     .Property(e => e.PlanStatus)
            //     .HasConversion(planStatusConverter);
                // .HasConversion(
                //     v => v.ToString(),
                //     v => (PlanStatus)Enum.Parse(typeof(PlanStatus), v));
        }
    }
}