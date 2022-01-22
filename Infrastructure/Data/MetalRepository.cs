using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using Core.Entities;
using Core.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data
{
    public class MetalRepository : IMetalRepository
    {
        private readonly StoreContext _context;
        public MetalRepository(StoreContext context)
        {
            _context = context;
        }

        public async Task<Metal> GetMetalAsync()
        {
            return await _context.Metals
                .Include(r => r.Rates).FirstOrDefaultAsync();
            //return null;
        }

        public async Task<List<MetalType>> GetMetalTypesAsync()
        {
            var metaltypes = await _context.MetalTypes.ToListAsync();
            return metaltypes;
        }

        public async Task<List<MetalType>> GetMetalAfterShapping()
        {
            var metalsData = await _context.Metals
                 .Include(r => r.Rates).FirstOrDefaultAsync();
            var properties = typeof(Rates).GetProperties();

            // var props = new Dictionary<string, object>();
            // foreach(var prop in metalsData.Rates.GetType().GetProperties(BindingFlags.Public|BindingFlags.Instance))
            // {
            //     props.Add(prop.Name, prop.GetValue(metalsData.Rates, null));
            // }
            var toExclude = new HashSet<string>() { "Id", "XRH", "USD" };

            var json = metalsData.Rates.GetType()
                        .GetProperties()
                        .Where(property => !toExclude.Contains(property.Name))
                        .Select(p => new MetalType { Name = p.Name })
                        .ToList();

            return json;
        }

        public async Task<Metal> GetMetalByIdAsync(int id)
        {
            return await _context.Metals
                 .Include(r => r.Rates).FirstOrDefaultAsync(p => p.Id == id);
        }
    }
}
