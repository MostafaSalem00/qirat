using System.Threading.Tasks;
using Core.Interfaces;

namespace Infrastructure.Data.Services
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly StoreContext _context;
        public UnitOfWork(StoreContext context)
        {
            _context = context;
            Metals = new MetalRepository(context);
            Plans = new PlanRepository(context);
        }
        public IMetalRepository Metals {get; set;}

        public IPlanRepository Plans {get; set;}

        public async Task<int> complete()
        {
            return await _context.SaveChangesAsync();
        }

        public void Dispose()
        {
            _context.Dispose();
        }
    }
}