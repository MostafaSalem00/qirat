

using System.Reflection;
using Core.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data
{
    public class StoreContext : IdentityDbContext<AppUser>
    {
        public StoreContext(DbContextOptions<StoreContext> options) : base(options)
        {
        }

        public DbSet<Attachment> Attachments { get; set; }
        public DbSet<KnowAboutUs> KnowAboutUs { get; set; }
        public DbSet<Rates> Rates { get; set; }
        public DbSet<Metal> Metals { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<ProductBrand> ProductBrands { get; set; }
        public DbSet<ProductType> ProductTypes { get; set; }

        public DbSet<MetalType> MetalTypes { get; set; }
        public DbSet<PlanType> PlanTypes { get; set; }

        public DbSet<OrderItem> OrderItems { get; set; }
        public DbSet<Plan> Plans { get; set; }

        public DbSet<PlanInvitation> PlanInvitations { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        }
    }
}